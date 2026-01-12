from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in
from django.utils.timezone import now

@receiver(user_logged_in)
def update_login_time(sender, request, user, **kwargs):
    user.last_login_time = now()
    user.save()
