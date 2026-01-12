from django.db import models

# Create your models here.

class Job(models.Model):
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name="jobs",
    on_delete= models.CASCADE
  )
  company_name = models.CharField(max_length=100, default=None)
  created_at = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=200, default=None)
  post_date = models.DateField(auto_now=False, auto_now_add=False, default=None, blank=True)
  location = models.CharField(max_length=250, default=None, blank=True)
  salary = models.CharField(max_length=50, default=None, blank=True)
  benefits = models.TextField(max_length=500, default=None, blank=True)
  job_url = models.URLField(max_length=500, default=None, blank=True)
  requirements = models.TextField(max_length=2000, default=None, blank=True)
  description = models.TextField(max_length=2000, default=None, blank=True)
  saved = 'Saved'
  applied = 'Applied'
  interview = 'Interview'
  offer = 'Offer'
  declined = 'Declined'
  job_status_choices = [
    (saved, 'Saved'),
    (applied, 'Applied'),
    (interview, 'Interview'),
    (offer, 'Offer'),
    (declined, 'Declined'),
  ]
  job_status = models.CharField(
    max_length=100,
    choices=job_status_choices,
    default= saved
  )
  full_time = 'Full Time'
  part_time = 'Part Time'
  temporary = 'Temporary'
  contract = 'Contract'
  internship = 'Internship'
  job_type_choices = [
    (full_time, 'Full Time'),
    (part_time, 'Part Time'),
    (temporary, 'Temporary'),
    (contract, 'Contract'),
    (internship, 'Internship'),
  ]
  job_type = models.CharField(
    max_length=100,
    choices=job_type_choices,
    default=None
  )
