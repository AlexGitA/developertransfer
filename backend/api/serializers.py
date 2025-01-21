from rest_framework.serializers import ModelSerializer
from ..models import TestClass, UserDetails
# Converts django models into JSON


class TestClassSerializer(ModelSerializer):
    class Meta:
        model = TestClass
        fields = ('id', 'title', 'body')
