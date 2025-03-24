from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, Skill, Post, Topic, Comment
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from django.core.exceptions import PermissionDenied
from rest_framework import filters
from .serializers import UserDetailsReadSerializer,  UserDetailsUpdateSerializer, CommentSerializer, SkillSerializer, PostSerializer, TopicSerializer
from rest_framework.decorators import action


# ViewSet to get the UserDetails
# todo add search for multiple skills

class UserDetailsReadView(ReadOnlyModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsReadSerializer
    search_fields = ['current_role','user__username','user__first_name', 'skills__name']
    filter_backends = (filters.SearchFilter,)



# ViewSet to update the UserDetails
class UserDetailsUpdateView(ModelViewSet):
    serializer_class = UserDetailsUpdateSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch']
    parser_classes = [MultiPartParser, FormParser]

    search_fields = ['current_role', 'user__username', 'user__first_name', 'skills__name']
    filter_backends = (filters.SearchFilter,)
    queryset = UserDetails.objects.all()

    def get_queryset(self):
        # Your existing queryset method remains unchanged
        qs = super().get_queryset()

        mentorship_mode = self.request.query_params.get('mentorshipMode', '')
        field = self.request.query_params.get('field', '')
        language = self.request.query_params.get('language', '')
        country = self.request.query_params.get('country', '')
        verified = self.request.query_params.get('verified', 'false').lower() == 'true'
        top_rated = self.request.query_params.get('topRated', 'false').lower() == 'true'
        local_only = self.request.query_params.get('localOnly', 'false').lower() == 'true'

        if mentorship_mode == 'mentor':
            qs = qs.filter(mentor=True)
        elif mentorship_mode == 'mentee':
            qs = qs.filter(mentor=False)

        if field:
            qs = qs.filter(current_role__icontains=field)

        if language:
            qs = qs.filter(preferred_language__iexact=language)

        if country:
            qs = qs.filter(country__iexact=country)

        if verified:
            qs = qs.filter(is_verified=True)

        qs = qs.exclude(user=self.request.user)

        return qs

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        user_details = self.get_object()

        # Prevent self-likes
        if user_details.user == request.user:
            return Response({'error': 'You cannot like yourself'}, status=status.HTTP_400_BAD_REQUEST)

        # Only like mentors
        if not user_details.mentor:
            return Response({'error': 'You can only like mentors'}, status=status.HTTP_400_BAD_REQUEST)

        user_details.likes.add(request.user)
        user_details.likes_count = user_details.likes.count()  # Update likes count
        user_details.save()

        return Response({'status': 'user liked'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        user_details = self.get_object()

        # Remove the user from likes
        user_details.likes.remove(request.user)
        user_details.likes_count = user_details.likes.count()  # Update likes count
        user_details.save()

        return Response({'status': 'user unliked'}, status=status.HTTP_200_OK)
    def get_object(self):
        """Get or create user details for the current user."""
        obj, created = UserDetails.objects.get_or_create(user=self.request.user)
        return obj

    def retrieve(self, request, *args, **kwargs):
        """Override retrieve to use ReadSerializer for GET requests"""
        instance = self.get_object()
        serializer = UserDetailsReadSerializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """Handle PATCH requests."""
        instance = self.get_object()

        # Ensure user only updates their own details
        if instance.user != request.user:
            raise PermissionDenied("You can only update your own details")

        # Deserialize and validate data
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Use UserDetailsReadSerializer to return complete skill information
            read_serializer = UserDetailsReadSerializer(instance)

            return Response(
                {
                    "message": "Update successful!",
                    "data": read_serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ViewSet to get the Posts
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()

        post.likes.add(request.user)
        post.likes_count = post.likes.count()  # Update likes count
        post.save()
        
        return Response({'status': 'post liked'}, status=status.HTTP_200_OK)
        
    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        post = self.get_object()
        # Remove the user from likes
        post.likes.remove(request.user)
        post.likes_count = post.likes.count()  # Update likes count
        post.save()
        
        return Response({'status': 'post unliked'}, status=status.HTTP_200_OK)


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = TopicSerializer


# ViewSet to get the Skills
class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = SkillSerializer


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter comments by post if post_id is provided
        post_id = self.request.query_params.get('post_id', None)
        if post_id is not None:
            return Comment.objects.filter(post_id=post_id).order_by('-created')
        return Comment.objects.all().order_by('-created')
    
    def perform_create(self, serializer):
        # Automatically set the author to the current user
        serializer.save(author=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # Add validation for required fields
        if 'content' not in request.data:
            return Response(
                {'error': 'Content is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if 'post' not in request.data:
            return Response(
                {'error': 'Post ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Create the comment
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save with the current user as author
        comment = serializer.save(author=self.request.user)
        
        # Update the post's comment count
        post = Post.objects.get(id=request.data['post'])
        post.comments_count = post.comments.count()
        post.save()
        
        # Get the updated serializer data with author details
        response_serializer = self.get_serializer(comment)
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            response_serializer.data,  # Use the new serializer with complete data
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
