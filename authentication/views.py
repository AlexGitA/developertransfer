from dj_rest_auth.registration.views import RegisterView
from backend.services import create_user_details
# Create your views here.

from django.conf import settings
from django.http import HttpResponseRedirect


def email_confirm_redirect(request, key):
    return HttpResponseRedirect(
        f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/"
    )


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )


class CustomRegisterView(RegisterView):
    def perform_create(self, serializer):
        user = super().perform_create(serializer)
        create_user_details(user)
        return user
