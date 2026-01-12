import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Job
from .serializers.common import JobSerializer
from .serializers.populated import PopulatedJobSerializer

from rest_framework.permissions import IsAuthenticated

class JobListView(APIView):
  permission_classes = [IsAuthenticated]

  # GET
  # Get all jobs
  def get(self, request):
    jobs = Job.objects.filter(owner=request.user)
    serialized_jobs = PopulatedJobSerializer(jobs, many=True)
    return Response(serialized_jobs.data, status=status.HTTP_200_OK)

  # POST 
  # Add a new job
  def post(self, request):
    job_to_add = JobSerializer(data=request.data)
    try:
      job_to_add.is_valid(True)
      job_to_add.save()
      return Response(job_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('ERROR')
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class JobDetailView(APIView):
  permission_classes = [IsAuthenticated]

  def get_job(self, pk):
    try:
      return Job.objects.get(pk=pk)
    except Job.DoesNotExist:
      raise NotFound(detail="Job not found.")

  # GET
  # Get job by id
  def get(self, request, pk):
      job = self.get_job(pk=pk)
      if job.owner != request.user:
          raise PermissionDenied("Unauthorized")
      serialized_job = PopulatedJobSerializer(job)
      return Response(serialized_job.data)

  # UPDATE
  def put(self, request, pk):
    job_to_update = self.get_job(pk=pk)
    if job_to_update.owner != request.user:
      raise PermissionDenied("Unauthorized")
    updated_job = JobSerializer(job_to_update, data=request.data) 
    try:
        updated_job.is_valid(True)
        updated_job.save()
        return Response(updated_job.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


  # DELETE
  def delete(self, request, pk):
      job_to_delete = self.get_job(pk)
      if job_to_delete.owner != request.user:
          raise PermissionDenied("Unauthorized")
      job_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

class JobStatusView(APIView):
  permission_classes = [IsAuthenticated]

  def get_job(self, pk):
    try:
      return Job.objects.filter(job_status=pk)
    except Job.DoesNotExist:
      raise NotFound(detail="No jobs with this status found.")

  # GET
  # Get jobs by job_status
  def get(self, request, pk):
      jobs = self.get_job(pk=pk)
      serialized_jobs = PopulatedJobSerializer(jobs.filter(owner=request.user), many=True)
      return Response(serialized_jobs.data)