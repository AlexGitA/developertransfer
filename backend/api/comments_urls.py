from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommentViewSet

comments_router = DefaultRouter()
comments_router.register(r'', CommentViewSet, basename='comments')  # Empty prefix


urlpatterns = [
    path('', include(comments_router.urls)),
]