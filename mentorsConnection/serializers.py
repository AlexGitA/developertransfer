from rest_framework import serializers
from django.contrib.auth import get_user_model, settings
from .models import Mentorship, ConnectionStatus

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id', 'full_name', 'image']

class MentorshipSerializer(serializers.ModelSerializer):
    mentor = UserSerializer()
    mentee = UserSerializer()
    mentor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    mentee = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Mentorship
        fields = ['id', 'mentor', 'mentee', 'status', 'message', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'mentee']

    def validate_mentor(self, value):
        if value == self.context['request'].user:
            raise serializers.ValidationError("You cannot create a mentorship with yourself")
        return value