from django.apps import AppConfig

class MentorsconnectionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mentorsConnection'

    def ready(self):
        import mentorsConnection.signals