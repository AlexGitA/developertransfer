from .models import UserDetails


def create_user_details(user):
    return UserDetails.objects.create(user=user)
