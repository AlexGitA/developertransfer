from rest_framework.serializers import ModelSerializer
from ..models import UserDetails, Skill, Post, Topic, Comment
from django.contrib.auth.models import User
from rest_framework import serializers


# Converts django models into JSON


# Serializer for reading user's  details
class UserDetailsReadSerializer(ModelSerializer):
    id = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    country = serializers.CharField(allow_null=True, required=False)
    # skills = serializers.PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all())  # For write operations
    skills_info = serializers.SerializerMethodField()  # For read operations

    class Meta:
        model = UserDetails
        exclude = ['last_time_online',
                   'user',
                   'date_of_birth',
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


# Serializer for updating user's own details
class UserDetailsUpdateSerializer(ModelSerializer):
    id = serializers.IntegerField(source='user.id', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    skills = serializers.PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all(), required=False)

    class Meta:
        model = UserDetails
        fields = [
            'id',
            'first_name',
            'last_name',
            'current_role',
            'country',
            'preferred_language',
            'bio',
            'goals',
            'github_profile',
            'instagram_profile',
            'looking_for_mentor',
            'mentor',
            'skills'
        ]

    def update(self, instance, validated_data):
        # Get the user data from validated_data
        user_data = validated_data.pop('user', {})

        # Handle skills separately if present
        skills = validated_data.pop('skills', None)

        # Update the associated user's first and last name
        if user_data:
            user = instance.user
            if 'first_name' in user_data:
                user.first_name = user_data['first_name']
            if 'last_name' in user_data:
                user.last_name = user_data['last_name']
            user.save()

        # Update skills if provided
        if skills is not None:
            instance.skills.set(skills)

        # Update the UserDetails fields
        return super().update(instance, validated_data)


class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


# todo: finish
class PostSerializer(ModelSerializer):
    has_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = '__all__'
        
    def get_has_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user in obj.likes.all()
        return False


class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class CommentAuthorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    
    class Meta:
        model = User
        fields = ['id', 'username']


class CommentSerializer(serializers.ModelSerializer):
    author = CommentAuthorSerializer(read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)
    
    class Meta:
        model = Comment
        fields = [
            'id', 
            'content', 
            'post', 
            'author',
            'author_id',
            'parent',
            'likes_count',
            'created', 
            'updated'
        ]
        read_only_fields = ['author', 'author_id', 'likes_count', 'created', 'updated']
