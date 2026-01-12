from rest_framework import serializers
from ..models import Job

class JobSerializer(serializers.ModelSerializer):
  # job_status = serializers.SerializerMethodField()
  # job_type = serializers.SerializerMethodField()
  class Meta:
    model = Job
    fields = "__all__"

  # def get_job_status(self,obj):
  #   return obj.get_job_status_display()
  # def get_job_type(self,obj):
  #   return obj.get_job_type_display()