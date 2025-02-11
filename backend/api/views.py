from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, Room, Skill
from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import UserDetailsReadSerializer, RoomSerializer, SkillSerializer


class UserDetailsReadView(ReadOnlyModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsReadSerializer


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
