from django.db import models

# Create your models here.
class Contact(models.Model):
  owner = models.ForeignKey(
  'jwt_auth.User',
  related_name="contacts",
  on_delete= models.CASCADE
  )
  job = models.ForeignKey('jobs.Job', 
  related_name="contacts", 
  on_delete=models.CASCADE
  )
  # company = models.ForeignKey(
  # 'companies.Company',
  # related_name="contact",
  # on_delete= models.CASCADE
  # )
  first_name = models.CharField(max_length=50, default=None)
  last_name = models.CharField(max_length=50, default=None)
  title = models.CharField(max_length=50, default=None, blank=True)
  phone = models.CharField(max_length=20, default=None, blank=True) 
  email = models.CharField(max_length=50, default=None, blank=True)