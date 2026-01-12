from django.db import models

# Create your models here.

class Document(models.Model):
  owner = models.ForeignKey(
  'jwt_auth.User',
  related_name="documents",
  on_delete= models.CASCADE
  )
  job = models.ForeignKey('jobs.Job', related_name="documents", on_delete=models.CASCADE)
  title = models.CharField(max_length=200, default=None)
  file_url = models.URLField(max_length=200, default=None)
  resume = 'Resume'
  cv = 'CV'
  cover_letter = 'Cover Letter'
  transcript = 'Transcript'
  license = 'License'
  certification = 'Certification'
  writing_sample = 'Writing Sample'
  code_sample = 'Code Sample'
  offer_letter = 'Offer Letter'
  other = 'Other'
  category_choices = [
  (resume, 'Resume'),
  (cv, 'CV'),
  (cover_letter, 'Cover Letter'),
  (transcript, 'Transcript'),
  (license, 'License'),
  (certification, 'Certification'),
  (writing_sample, 'Writing Sample'),
  (code_sample, 'Code Sample'),
  (offer_letter, 'Offer Letter'),
  (other, 'Other'),
  ]
  category = models.CharField(
    max_length=100,
    choices=category_choices,
    default=None
  )