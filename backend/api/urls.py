from rest_framework.routers import DefaultRouter
from .views import UserDetailsReadView,UserDetailsUpdateView

backend_router = DefaultRouter()
backend_router.register(r'user-details', UserDetailsReadView, basename='user-details')
backend_router.register(r'user-update', UserDetailsUpdateView, basename='user-update')

urlpatterns = backend_router.urls
