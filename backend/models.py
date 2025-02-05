from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from django.core.validators import URLValidator


# class Topic(models.Model):
#   name = models.CharField(max_length=100)

#  def __str__(self):
#     return self.name


class Room(models.Model):
    name = models.CharField(
        max_length=100,
        help_text="Name of the room"
    )
    description = models.TextField(
        null=True,
        blank=True,
        help_text="Detailed description of the room"
    )
    updated = models.DateTimeField(
        auto_now=True,
        help_text="Last time the room was updated"
    )
    created = models.DateTimeField(
        auto_now_add=True,
        help_text="When the room was created"
    )
    updatedDate = models.DateField(
        auto_now=True,
        help_text="Date of last update"
    )

    class Meta:
        ordering = ['-updated', '-created']
        verbose_name = "Room"
        verbose_name_plural = "Rooms"

    def __str__(self):
        return self.name


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

    class Meta:
        verbose_name = "User detail"
        verbose_name_plural = "User details"

    def __str__(self):
        return f"Details of {self.user.username}"
