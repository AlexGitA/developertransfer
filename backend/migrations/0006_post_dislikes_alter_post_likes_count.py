# Generated by Django 5.0.12 on 2025-03-06 12:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_comment_post_topic_delete_room_comment_post_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='dislikes',
            field=models.ManyToManyField(blank=True, help_text='Users who disliked this post', related_name='disliked_posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='post',
            name='likes_count',
            field=models.PositiveIntegerField(default=0, help_text='Net number of likes (likes - dislikes)'),
        ),
    ]
