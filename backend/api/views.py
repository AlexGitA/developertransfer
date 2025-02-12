from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, Skill, Post
from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import UserDetailsReadSerializer, SkillSerializer, PostSerializer


class UserDetailsReadView(ReadOnlyModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsReadSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
