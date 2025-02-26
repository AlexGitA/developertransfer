from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from django.core.validators import URLValidator


# SKILLS TO ADD TO THE USER
class Skill(models.Model):
    SKILL_TYPES = [
        ('LANG', 'Programming Language'),
        ('FRONT', 'Frontend'),
        ('BACK', 'Backend'),
        ('DB', 'Database'),
        ('DEVOPS', 'DevOps & Cloud'),
        ('MOBILE', 'Mobile Development'),
        ('TEST', 'Testing'),
        ('OTHER', 'Tools & Others')
    ]

    name = models.CharField(max_length=50, unique=True)
    skill_type = models.CharField(max_length=10, choices=SKILL_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


# CLASS TO EXTEND THE DJANGO USER WITH CUSTOM DETAIL
class UserDetails(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('es', 'Spanish'),
        ('fr', 'French'),
        ('de', 'German'),
        ('zh', 'Chinese'),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="details",
        help_text="Associated user account",
        primary_key=True
    )

    is_online = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Current online status"
    )
    last_time_online = models.DateTimeField(
        blank=True,
        null=True,
        help_text="Last time user was online"
    )
    is_verified = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Email verification status"
    )

    date_of_birth = models.DateField(
        blank=True,
        null=True,
        help_text="User's date of birth"
    )
    preferred_language = models.CharField(
        max_length=15,
        choices=LANGUAGE_CHOICES,
        blank=True,
        null=True,
        help_text="Preferred interface language"
    )
    country = CountryField(
        blank=True,
        null=True,
        help_text="User's country of residence"
    )
    bio = models.TextField(
        blank=True,
        null=True,
        max_length=500,
        help_text="User's biography"
    )
    current_role = models.CharField(
        max_length=40,
        blank=True,
        null=True,
        help_text="User's current professional role"
    )
    profile_progress = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        help_text="Profile completion percentage"
    )

    skill_level = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        help_text="General skill level"
    )
    analytical_level = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        help_text="Analytical skill level"
    )
    startup_corporate_level = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        help_text="Startup vs corporate experience level"
    )

    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        default='profile_pictures/default-profile.png',
        help_text="User's profile picture"
    )

    github_profile = models.URLField(
        max_length=200,
        blank=True,
        null=True,
        validators=[URLValidator()],
        help_text="GitHub profile URL"
    )
    instagram_profile = models.URLField(
        max_length=200,
        blank=True,
        null=True,
        validators=[URLValidator()],
        help_text="Instagram profile URL"
    )
    linkedin_profile = models.URLField(
        max_length=200,
        blank=True,
        null=True,
        validators=[URLValidator()],
        help_text="LinkedIn profile URL"
    )

    looking_for_mentor = models.BooleanField(
        default=False,
        help_text="Whether user is looking for a mentor"
    )
    mentor = models.BooleanField(
        default=False,
        help_text="Whether user is willing to be a mentor"
    )

    goals = models.TextField(
        blank=True,
        null=True,
        help_text="User's professional goals (comma-separated)"
    )

    skills = models.ManyToManyField(
        Skill,
        blank=True,
        help_text="User's technical skills")

    class Meta:
        verbose_name = "User detail"
        verbose_name_plural = "User details"

    def __str__(self):
        return f"Details of {self.user.username}"


### Post Classes
class Topic(models.Model):
    name = models.CharField(
        max_length=25,
        unique=True,
        help_text="Name of the topic"
    )
    description = models.TextField(
        null=True,
        blank=True,
        help_text="Description of the topic"
    )
    created = models.DateTimeField(
        auto_now_add=True,
        help_text="When the topic was created"
    )
    followers = models.ManyToManyField(
        User,
        related_name='followed_topics',
        blank=True,
        help_text="Users following this topic"
    )

    class Meta:
        ordering = ['name']
        verbose_name = "Topic"
        verbose_name_plural = "Topics"

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(
        max_length=150,
        help_text="Title of the post"
    )
    content = models.TextField(
        help_text="Content of the post"
    )
    url = models.URLField(
        max_length=200,
        blank=True,
        null=True,
        help_text="URL for link posts"
    )
    # todo: create post media upload
    media = models.FileField(
        upload_to='post_media/',
        blank=True,
        null=True,
        help_text="Media file for image/video posts"
    )

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts',
        help_text="User who created the post"
    )
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name='posts',
        help_text="Topic of the post"
    )

    likes = models.ManyToManyField(
        User,
        related_name='liked_posts',
        blank=True,
        help_text="Users who liked this post"
    )
    likes_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of likes"
    )
    comments_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of comments"
    )

    is_pinned = models.BooleanField(
        default=False,
        help_text="Whether the post is pinned to the top"
    )
    is_archived = models.BooleanField(
        default=False,
        help_text="Whether the post is archived"
    )

    # todo adjust the model
    created = models.DateTimeField(
        auto_now_add=True,
        help_text="When the post was created"
    )
    updated = models.DateTimeField(
        auto_now=True,
        help_text="Last time the post was updated"
    )

    class Meta:
        ordering = ['-created']
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        indexes = [
            models.Index(fields=['-created']),
            models.Index(fields=['author']),
            models.Index(fields=['topic']),
        ]

    def __str__(self):
        return self.title

    def update_likes_count(self):
        self.likes_count = self.likes.count()
        self.save()


class Comment(models.Model):
    content = models.TextField(
        help_text="Content of the comment"
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
        help_text="Associated post"
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='comments',
        help_text="User who wrote the comment"
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies',
        help_text="Parent comment for nested replies"
    )
    likes = models.ManyToManyField(
        User,
        related_name='liked_comments',
        blank=True,
        help_text="Users who liked this comment"
    )
    likes_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of likes on this comment"
    )
    created = models.DateTimeField(
        auto_now_add=True,
        help_text="When the comment was created"
    )
    updated = models.DateTimeField(
        auto_now=True,
        help_text="Last time the comment was updated"
    )

    class Meta:
        ordering = ['-created']
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        indexes = [
            models.Index(fields=['-created']),
            models.Index(fields=['post']),
            models.Index(fields=['author']),
        ]

    def __str__(self):
        return f"Comment by {self.author.username} on {self.post.title}"

    def update_likes_count(self):
        self.likes_count = self.likes.count()
        self.save()
