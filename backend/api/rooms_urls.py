from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomViewSet

rooms_router = DefaultRouter()
rooms_router.register(r'', RoomViewSet, basename='rooms')  # Empty prefix

urlpatterns = [
    path('', include(rooms_router.urls)),
]
