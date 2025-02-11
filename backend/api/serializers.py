from rest_framework.serializers import ModelSerializer
from ..models import UserDetails, Room, Skill
from django.contrib.auth.models import User
from rest_framework import serializers


# Converts django models into JSON

class UserDetailsReadSerializer(ModelSerializer):
    id = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    country = serializers.CharField(allow_null=True)
    #skills = serializers.PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all())  # For write operations
    skills_info = serializers.SerializerMethodField()  # For read operations

    class Meta:
        model = UserDetails
        exclude = ['last_time_online', 'user', 'date_of_birth',
                   'profile_progress']

    def get_skills_info(self, obj):
        return [
            {
                'id': skill.id,
                'name': skill.name,
                'skill_type': skill.skill_type,
                'type_display': skill.get_skill_type_display(),
            }
            for skill in obj.skills.all()
        ]


# TODO implement the write method
class UserDetailsWriteSerializer(ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['date_of_birth']


class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
