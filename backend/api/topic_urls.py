from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TopicViewSet

topics_router = DefaultRouter()
topics_router.register(r'', TopicViewSet, basename='topics')  # Empty prefix

urlpatterns = [
    path('', include(topics_router.urls)),
]