from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
        
PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]

# Create your models here.
class Note(models.Model):
  owner = models.ForeignKey(
  'jwt_auth.User',
  related_name="notes",
  on_delete= models.CASCADE
  )
  job = models.ForeignKey('jobs.Job', related_name="notes", on_delete=models.CASCADE)
  excitement = models.DecimalField(max_digits=3, decimal_places=0, validators=PERCENTAGE_VALIDATOR)
  notes = models.TextField(max_length=500, default=None, blank=True)
  questions = models.TextField(max_length=500, default=None, blank=True)
  pros = models.TextField(max_length=500, default=None, blank=True)
  cons = models.TextField(max_length=500, default=None, blank=True)