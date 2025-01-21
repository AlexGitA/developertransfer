from rest_framework.routers import DefaultRouter
from backend.api.urls import backend_router
from django.urls import path, include

router = DefaultRouter()
# backend app
router.registry.extend(backend_router.registry)

# /test
urlpatterns = [
    path('', include(router.urls))
]
