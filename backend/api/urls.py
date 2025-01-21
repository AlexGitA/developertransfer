from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TestClassViewSet

backend_router = DefaultRouter()
backend_router.register(r'test', TestClassViewSet)

urlpatterns = backend_router.urls
