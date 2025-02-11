from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserDetailsReadView

backend_router = DefaultRouter()
backend_router.register(r'user-details', UserDetailsReadView, basename='user-details')

urlpatterns = backend_router.urls
