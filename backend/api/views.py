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
from friendship.models import Friend, FriendshipRequest
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers
from friendship.models import Friend
from django.db.models import Case, When, Value, CharField, Q
from django.db.models.functions import Concat

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
    http_method_names = ['get', 'patch', 'post']
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
        if user_details.user == request.user:
            return Response({'error': 'You cannot like yourself'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_details.mentor:
            return Response({'error': 'You can only like mentors'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_details.likes.add(request.user)
        user_details.likes_count = user_details.likes.count()
        user_details.save()
        return Response({'status': 'user liked'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        user_details = self.get_object()
        user_details.likes.remove(request.user)
        user_details.likes_count = user_details.likes.count()
        user_details.save()
        return Response({'status': 'user unliked'}, status=status.HTTP_200_OK)


    def get_object(self):
        """Get object based on the action being performed."""
        if self.action in ['like', 'unlike']:
            # For like/unlike actions, use the pk from the URL
            return super().get_object()
        else:
            # For other actions, get the current user's details
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

            read_serializer = UserDetailsReadSerializer(instance)

            return Response(
                {
                    "message": "Update successful!",
                    "data": read_serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Friend Request
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'details']

    def get_details(self, obj):
        try:
            details = obj.details
            return {
                'profile_picture': self._get_profile_picture(details),
                'current_role': details.current_role or 'No role specified',
                'is_online': details.is_online
            }
        except User.details.RelatedObjectDoesNotExist:
            return self._default_profile_details()

    def _get_profile_picture(self, details):
        if details.profile_picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(details.profile_picture.url)
            return details.profile_picture.url
        return None

    def _default_profile_details(self):
        return {
            'profile_picture': None,
            'current_role': 'No role specified',
            'is_online': False
        }

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    created = serializers.DateTimeField(format="%b %d, %Y %I:%M %p")

    class Meta:
        model = FriendshipRequest
        fields = ['id', 'from_user', 'created', 'message']  # message is automatically included

    def get_from_user(self, obj):
        return UserSerializer(
            obj.from_user,
            context=self.context
        ).data

class FriendSerializer(serializers.ModelSerializer):
    friend = serializers.SerializerMethodField()
    friendship_id = serializers.IntegerField(source='id')

    class Meta:
        model = Friend
        fields = ['friendship_id', 'friend', 'created']

    def get_friend(self, obj):
        if self.context['request'].user == obj.from_user:
            return UserSerializer(obj.to_user, context=self.context).data
        return UserSerializer(obj.from_user, context=self.context).data

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friend_status(request, user_id):
    try:
        other_user = User.objects.get(pk=user_id)

        # State machine resolution
        if Friend.objects.are_friends(request.user, other_user):
            return Response({"status": "friends"})

        request_sent = FriendshipRequest.objects.filter(
            from_user=request.user,
            to_user=other_user,
            rejected__isnull=True
        ).exists()

        request_received = FriendshipRequest.objects.filter(
            from_user=other_user,
            to_user=request.user,
            rejected__isnull=True
        ).exists()

        if request_sent:
            return Response({"status": "request_sent"})
        if request_received:
            req = FriendshipRequest.objects.get(
                from_user=other_user,
                to_user=request.user
            )
            return Response({
                "status": "request_received",
                "request_id": req.id
            })

        return Response({"status": "not_friends"})

    except User.DoesNotExist:
        return Response(
            {"status": "error"},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_list(request):
    try:
        # Get base queryset without database-specific features
        friendships = Friend.objects.filter(
            Q(from_user=request.user) | Q(to_user=request.user)
        )

        # Database-agnostic duplicate prevention
        unique_pairs = set()
        processed_friendships = []

        for friendship in friendships:
            # Create normalized pair identifier
            pair = tuple(sorted([friendship.from_user_id, friendship.to_user_id]))

            if pair not in unique_pairs:
                unique_pairs.add(pair)
                processed_friendships.append(friendship)

        serializer = FriendSerializer(
            processed_friendships,
            many=True,
            context={'request': request}
        )

        return Response(serializer.data)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

import logging
logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests(request):
    try:
        requests = FriendshipRequest.objects.filter(
            to_user=request.user,
            rejected__isnull=True
        ).select_related('from_user__details').order_by('-created')

        serializer = FriendRequestSerializer(
            requests,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)

    except Exception as e:
        logger.error(f"Request fetch error: {str(e)}")
        return Response(
            {"error": "Error fetching friend requests"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request, friendship_id):
    try:
        friend = Friend.objects.get(id=friendship_id)
        if request.user not in [friend.from_user, friend.to_user]:
            return Response(status=status.HTTP_403_FORBIDDEN)

        Friend.objects.remove_friend(request.user, friend.to_user)
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Friend.DoesNotExist:
        return Response({'error': 'Friend relationship not found'},
                      status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request, user_id):
    try:
        to_user = User.objects.get(pk=user_id)

        if request.user == to_user:
            return Response(
                {"error": "Cannot send request to yourself"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Friend.objects.are_friends(request.user, to_user):
            return Response(
                {"error": "Already friends"},
                status=status.HTTP_409_CONFLICT
            )

        pending_from_me = FriendshipRequest.objects.filter(
            from_user=request.user,
            to_user=to_user,
            rejected__isnull=True
        ).exists()

        pending_from_them = FriendshipRequest.objects.filter(
            from_user=to_user,
            to_user=request.user,
            rejected__isnull=True
        ).exists()

        if pending_from_me or pending_from_them:
            return Response(
                {"error": "Existing pending request"},
                status=status.HTTP_409_CONFLICT
            )

        FriendshipRequest.objects.filter(
            Q(from_user=request.user, to_user=to_user) |
            Q(from_user=to_user, to_user=request.user),
            rejected__isnull=False
        ).delete()

        friendship_request = Friend.objects.add_friend(
            request.user,
            to_user,
            message=f"{request.user.username} wants to connect!"
        )

        return Response(
            {"id": friendship_request.id, "message": "Request sent"},
            status=status.HTTP_201_CREATED
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(  # Add this generic exception handler
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_friend_request(request, request_id, action):
    try:
        friendship_request = FriendshipRequest.objects.get(
            pk=request_id,
            to_user=request.user
        )

        if action == 'accept':
            friendship_request.accept()
            return Response({"status": "accepted"})

        elif action == 'reject':
            friendship_request.reject()
            return Response({"status": "rejected"})

        return Response(
            {"error": "Invalid action"},
            status=status.HTTP_400_BAD_REQUEST
        )

    except FriendshipRequest.DoesNotExist:
        return Response(
            {"error": "Request not found"},
            status=status.HTTP_404_NOT_FOUND
        )

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
