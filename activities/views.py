from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import ActivitySerializer
from .serializers.populated import PopulatedActivitySerializer
from .models import Activity
from jobs.models import Job

import datetime
from django.db.models import Q

# Create your views here.

class ActivityListView(APIView):
    # Get all activities
    def get(self, request):
      activities = Activity.objects.filter(owner=request.user).order_by('id').order_by('completed_status')
      serialized_activities = PopulatedActivitySerializer(activities, many=True)
      return Response(serialized_activities.data, status=status.HTTP_200_OK)

    def post(self, request):
        activity_to_create = ActivitySerializer(data=request.data) 
        try:
            activity_to_create.is_valid(True)
            activity_to_create.save() 
            return Response(activity_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# Single activity view
class ActivityDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_activity(self, pk):
        try:
            return Activity.objects.get(pk=pk)
        except Activity.DoesNotExist:
            raise NotFound("Activity not found.")

    # GET
    # Get activity by id
    def get(self, request, pk):
        activity = self.get_activity(pk=pk)
        if activity.owner != request.user:
          raise PermissionDenied("Unauthorized")
        serialized_activity = ActivitySerializer(activity)
        return Response(serialized_activity.data)

    # UPDATE
    def put(self, request, pk):
      activity_to_update = self.get_activity(pk=pk)
      if activity_to_update.owner != request.user:
        raise PermissionDenied("Unauthorized")
      updated_activity = ActivitySerializer(activity_to_update, data=request.data) 
      try:
          updated_activity.is_valid(True)
          updated_activity.save()
          return Response(updated_activity.data, status=status.HTTP_202_ACCEPTED)
      except Exception as e:
          print(e)
          return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE
    def delete(self, request, pk):
        activity_to_delete = self.get_activity(pk)
        if activity_to_delete.owner != request.user:
            raise PermissionDenied("Unauthorized")
        activity_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ActivityByJobView(APIView):
    permission_classes = [IsAuthenticated]

    def get_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound("Job not found.")

    def get_activity(self, pk):
        try:
            return Activity.objects.filter(job=pk).order_by('id').order_by('completed_status')
        except Activity.DoesNotExist:
            raise NotFound("Activity not found.")

    # GET
    # Get activities by job id
    def get(self, request, pk):
        job = self.get_job(pk)
        if job.owner != request.user:
          raise PermissionDenied("Unauthorized")
        activities = self.get_activity(pk)
        serialized_activities = ActivitySerializer(activities, many=True)
        return Response(serialized_activities.data)

class ActivityByStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get_activity(self, pk):
        try:
            return Activity.objects.filter(completed_status=pk).order_by('id').order_by('completed_status')
        except Activity.DoesNotExist:
            raise NotFound("No activities of this status found")

    # GET
    # Get Activity by completed status
    def get(self, request, pk):
        activities = self.get_activity(pk)
        serialized_activities = PopulatedActivitySerializer(activities.filter(owner=request.user), many=True)
        return Response(serialized_activities.data)

class ActivityPastDueView(APIView):
    permission_classes = [IsAuthenticated]
    def get_activity(self):
      try:
          now = datetime.datetime.now()
          return Activity.objects.filter(due_date__lt=datetime.date(now.year, now.month, now.day)).order_by('id').order_by('completed_status')
      except Activity.DoesNotExist:
          raise NotFound("Activity not found.")

    # GET
    # Get Activity by date
    def get(self, request):
        activities = self.get_activity()
        serialized_activities = PopulatedActivitySerializer(activities.filter(owner=request.user), many=True)
        return Response(serialized_activities.data)

class ActivityDueTodayView(APIView):
    permission_classes = [IsAuthenticated]
    def get_activity(self):
      try:
          now = datetime.datetime.now()
          return Activity.objects.filter(due_date=datetime.date(now.year, now.month, now.day)).order_by('id').order_by('completed_status')
      except Activity.DoesNotExist:
          raise NotFound("Activity not found.")

    # GET
    # Get Activity by date
    def get(self, request):
        activities = self.get_activity()
        serialized_activities = PopulatedActivitySerializer(activities.filter(owner=request.user), many=True)
        return Response(serialized_activities.data)

class ActivityUpcomingView(APIView):
    permission_classes = [IsAuthenticated]
    def get_activity(self):
      try:
          now = datetime.datetime.now()
          return Activity.objects.filter(due_date__gte=datetime.date(now.year, now.month, now.day)).order_by('id').order_by('completed_status')
      except Activity.DoesNotExist:
          raise NotFound("Activity not found.")

    # GET
    # Get Activity by date
    def get(self, request):
        activities = self.get_activity()
        serialized_activities = PopulatedActivitySerializer(activities.filter(owner=request.user), many=True)
        return Response(serialized_activities.data)