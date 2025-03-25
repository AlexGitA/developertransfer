from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Mentorship
from django.conf import settings
from django.core.mail import send_mail

@receiver(post_save, sender=Mentorship)
def send_mentorship_notification(sender, instance, created, **kwargs):
    if created:
        subject = f"New mentorship request from {instance.mentee}"
        message = f"You have received a new mentorship request from {instance.mentee.email}.\n\nMessage: {instance.message}"
        recipient_list = [instance.mentor.email]
    else:
        subject = f"Mentorship request {instance.status}"
        message = f"Your mentorship request to {instance.mentor.email} has been {instance.status}"
        recipient_list = [instance.mentee.email]

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        recipient_list,
        fail_silently=True,
    )