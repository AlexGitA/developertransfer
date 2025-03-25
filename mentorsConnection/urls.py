from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MentorshipViewSet, MentorshipConnectionsView

router = DefaultRouter()
router.register(r'mentorships', MentorshipViewSet, basename='mentorship')

urlpatterns = [
    path('connections/', MentorshipConnectionsView.as_view(), name='mentorship-connections'),
    path('', include(router.urls)),
]