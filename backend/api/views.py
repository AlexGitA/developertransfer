from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, Skill, Post
from rest_framework.viewsets import ReadOnlyModelViewSet
from django.core.exceptions import PermissionDenied
from .serializers import UserDetailsReadSerializer, SkillSerializer, PostSerializer, UserDetailsUpdateSerializer
from rest_framework import filters
from .serializers import UserDetailsReadSerializer, SkillSerializer, PostSerializer


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


# ViewSet to get the Skills
class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
