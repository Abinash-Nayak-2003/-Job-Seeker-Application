from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Company
from jobs.models import Job
from .serializers.common import CompanySerializer
# from .serializer.populated import PopulatedCompanySerializer

from rest_framework.permissions import IsAuthenticated

class CompanyListView(APIView):
  permission_classes = [IsAuthenticated]
  # GET
  # Get all companies
  def get(self, request):
    companies = Company.objects.filter(owner=request.user)
    serialized_companies = CompanySerializer(companies, many=True)
    return Response(serialized_companies.data, status=status.HTTP_200_OK)

  # POST 
  # Add a new company
  def post(self, request):
    company_to_add = CompanySerializer(data=request.data)
    try:
      company_to_add.is_valid(True)
      print(company_to_add.validated_data)
      company_to_add.save()
      return Response(company_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('ERROR')
      print(e.__dict__)
      print(str(e))
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CompanyDetailView(APIView):
  permission_classes = [IsAuthenticated]

  def get_company(self, pk):
    try:
      return Company.objects.get(pk=pk)
    except Company.DoesNotExist:
      raise NotFound(detail="Company not found.")

  # GET
  # Get company by id
  def get(self, request, pk):
      company = self.get_company(pk=pk)
      if company.owner != request.user:
          raise PermissionDenied("Unauthorized")
      serialized_company = CompanySerializer(company)
      return Response(serialized_company.data)


  # UPDATE
  def put(self, request, pk):
    company_to_update = self.get_company(pk=pk)
    if company_to_update.owner != request.user:
        raise PermissionDenied("Unauthorized")
    updated_company = CompanySerializer(company_to_update, data=request.data) 
    try:
        updated_company.is_valid(True)
        updated_company.save()
        return Response(updated_company.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        
  # DELETE
  def delete(self, request, pk):
      company_to_delete = self.get_company(pk)
      if company_to_delete.owner != request.user:
          raise PermissionDenied("Unauthorized")
      company_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

class CompanyByJobView(APIView):
  permission_classes = [IsAuthenticated]

  def get_job(self, pk):
    try:
      return Job.objects.get(pk=pk)
    except Job.DoesNotExist:
      raise NotFound(detail="Job not found.")

  def get_company(self, pk):
    try:
      return Company.objects.filter(job=pk)
    except Company.DoesNotExist:
      raise NotFound(detail="No company found for this job.")

  # GET
  # Get company by job id
  def get(self, request, pk):
      job = self.get_job(pk)
      if job.owner != request.user:
        raise PermissionDenied("Unauthorized")
      company = self.get_company(pk=pk)
      serialized_company = CompanySerializer(company, many=True)
      return Response(serialized_company.data)