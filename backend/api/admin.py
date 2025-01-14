from django.contrib import admin

# Models are registered here

from .models import UserDetails

admin.site.register(UserDetails)
