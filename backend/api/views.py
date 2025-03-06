from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, Skill, Post, Topic, Comment
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from django.core.exceptions import PermissionDenied
from .serializers import UserDetailsReadSerializer, SkillSerializer, PostSerializer, UserDetailsUpdateSerializer, CommentSerializer

from rest_framework import filters
from .serializers import UserDetailsReadSerializer, SkillSerializer, PostSerializer, TopicSerializer
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

    def get_queryset(self):
        """Return the current user's details."""
        return UserDetails.objects.filter(user=self.request.user)

    def get_object(self):
        """Get or create user details for the current user."""
        obj, created = UserDetails.objects.get_or_create(user=self.request.user)
        return obj

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
            return Response(
                {
                    "message": "Update successful!",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ViewSet to get the Posts
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        # Hier implementieren Sie die Like-Logik
        # Zum Beispiel:
        post.likes.add(request.user)
        post.save()
        
        return Response({'status': 'post liked'}, status=status.HTTP_200_OK)


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


# ViewSet to get the Skills
class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
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
