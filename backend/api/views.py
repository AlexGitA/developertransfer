from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, TestClass
from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import TestClassSerializer, UserDetailsReadSerializer


class TestClassViewSet(ModelViewSet):
    queryset = TestClass.objects.all()
    serializer_class = TestClassSerializer


class UserDetailsReadView(ReadOnlyModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsReadSerializer