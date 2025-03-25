from django.contrib import admin
from .models import Mentorship

@admin.register(Mentorship)
class MentorshipAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'mentee', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('mentor__email', 'mentee__email')
    raw_id_fields = ('mentor', 'mentee')
    date_hierarchy = 'created_at'