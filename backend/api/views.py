from rest_framework.viewsets import ModelViewSet
from ..models import UserDetails, TestClass
from .serializers import TestClassSerializer


class TestClassViewSet(ModelViewSet):
    queryset = TestClass.objects.all()
    serializer_class = TestClassSerializer


