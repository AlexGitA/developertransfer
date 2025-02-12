from django.contrib import admin
from .models import UserDetails, Skill, Post, Comment, Topic

# Register your models here.

admin.site.register(UserDetails)
admin.site.register(Skill)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Topic)
