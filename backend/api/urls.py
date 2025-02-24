from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserDetailsReadView, UserDetailsUpdateView, PostViewSet, CommentViewSet

backend_router = DefaultRouter()
backend_router.register(r'user-details', UserDetailsReadView, basename='user-details')
backend_router.register(r'user-update', UserDetailsUpdateView, basename='user-update')

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(backend_router.urls)),
    path('', include(router.urls)),
]
