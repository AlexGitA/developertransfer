from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet

skills_router = DefaultRouter()
skills_router.register(r'', SkillViewSet, basename='skills')  # Empty prefix

urlpatterns = [
    path('', include(skills_router.urls)),  # Makes /skills work without extra path
]
