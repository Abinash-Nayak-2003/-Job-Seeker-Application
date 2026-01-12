from django.db import models

# Create your models here.

class Activity(models.Model):
  owner = models.ForeignKey(
  'jwt_auth.User',
  related_name="activities",
  on_delete= models.CASCADE
  )
  job = models.ForeignKey('jobs.Job', 
  related_name="activities", 
  on_delete=models.CASCADE
  )
  # title = models.CharField(max_length=200, default=None)
  due_date = models.DateField(auto_now=False, auto_now_add=False, default=None)
  notes = models.TextField(max_length=500, default=None, blank=True)
  completed_status = models.BooleanField()
  custom_CV = 'Job-Specific CV'
  custom_resume = 'Job-Specific Resume'
  apply = 'Apply'
  follow_up = 'Follow Up'
  email_response = 'Email: Response Required'
  phone_response = 'Call: Response Required'
  document_request = 'Documents Requested: Response Required'
  phone_interview = 'Phone Interview'
  video_interview = 'Video Interview'
  technical_interview = 'Technical Interview'
  on_site_interview = 'On Site Interview'
  thank_you = 'Follow Up: Thank You'
  offer_response = 'Offer: Response Required'
  other = 'Other'
  category_choices = [
  (custom_CV, 'Job-Specific CV'),
  (custom_resume, 'Job-Specific Resume'),
  (apply,'Apply'),
  (follow_up, 'Follow Up'),
  (email_response, 'Email: Response Required'),
  (phone_response, 'Call: Response Required'),
  (document_request, 'Documents Requested: Response Required'),
  (phone_interview, 'Phone Interview'),
  (video_interview, 'Video Interview'),
  (technical_interview, 'Technical Interview'),
  (on_site_interview, 'On Site Interview'),
  (thank_you, 'Follow Up: Thank You'),
  (offer_response, 'Offer: Response Required'),
  (other, 'Other')
  ]
  category = models.CharField(
    max_length=100,
    choices=category_choices,
    default=None
  )

