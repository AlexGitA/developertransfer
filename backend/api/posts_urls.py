from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

posts_router = DefaultRouter()
posts_router.register(r'', PostViewSet, basename='posts')  # Empty prefix

urlpatterns = [
    path('', include(posts_router.urls)),
]
