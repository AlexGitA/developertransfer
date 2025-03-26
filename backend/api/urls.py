from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserDetailsReadView, UserDetailsUpdateView, PostViewSet, CommentViewSet
from . import views

backend_router = DefaultRouter()
backend_router.register(r'user-details', UserDetailsReadView, basename='user-details')
backend_router.register(r'user-update', UserDetailsUpdateView, basename='user-update')

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(backend_router.urls)),
    path('', include(router.urls)),
    path('friends/request/<int:user_id>/', views.send_friend_request, name='send-friend-request'),
    path('friends/requests/<int:request_id>/<str:action>/', views.handle_friend_request, name='handle-friend-request'),
    path('friends/status/<int:user_id>/', views.get_friend_status, name='friend-status'),
    path('friends/', views.friend_list, name='friend-list'),
    path('friends/requests/', views.friend_requests, name='friend-requests'),
    path('friends/<int:friendship_id>/', views.remove_friend, name='remove-friend'),
]
