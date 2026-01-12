from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  email = models.CharField(max_length=100, unique=True)



  is_admin = models.BooleanField(default=False)
  last_login_time = models.DateTimeField(null=True, blank=True)

  def __str__(self):
      return self.username