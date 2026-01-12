from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import ContactSerializer
from .models import Contact
from jobs.models import Job
from companies.models import Company

# Create your views here.

class ContactListView(APIView):
    permission_classes = [IsAuthenticated]

    # GET
    # Get all contacts
    def get(self, request):
      contacts = Contact.objects.filter(owner=request.user)
      serialized_contacts = ContactSerializer(contacts, many=True)
      return Response(serialized_contacts.data, status=status.HTTP_200_OK)

    # POST
    # Add a new contact
    def post(self, request):
        contact_to_create = ContactSerializer(data=request.data) 
        try:
            contact_to_create.is_valid(True)
            contact_to_create.save() 
            return Response(contact_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ContactDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_contact(self, pk):
        try:
            return Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            raise NotFound("Contact not found.")

    # GET
    # Get contact by id
    def get(self, request, pk):
        contact = self.get_contact(pk=pk)
        if contact.owner != request.user:
          raise PermissionDenied("Unauthorized")
        serialized_contact = ContactSerializer(contact)
        return Response(serialized_contact.data)


    # UPDATE
    def put(self, request, pk):
      contact_to_update = self.get_contact(pk=pk)
      if contact_to_update.owner != request.user:
          raise PermissionDenied("Unauthorized")
      updated_contact = ContactSerializer(contact_to_update, data=request.data) 
      try:
          updated_contact.is_valid(True)
          updated_contact.save()
          return Response(updated_contact.data, status=status.HTTP_202_ACCEPTED)
      except Exception as e:
          print(e)
          return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    # DELETE
    def delete(self, request, pk):
        contact_to_delete = self.get_contact(pk)
        if contact_to_delete.owner != request.user:
            raise PermissionDenied("Unauthorized")
        contact_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ContactByCompanyView(APIView):
    permission_classes = [IsAuthenticated]

    def get_company(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise NotFound("Company not found.")

    def get_contact(self, pk):
        try:
            return Contact.objects.filter(company=pk)
        except Contact.DoesNotExist:
            raise NotFound("No contacts found for this company.")

    # GET
    # Get contacts by company id
    def get(self, request, pk):
        company = self.get_company(pk)
        if company.owner != request.user:
          raise PermissionDenied("Unauthorized")
        contacts = self.get_contact(pk=pk)
        serialized_contacts = ContactSerializer(contacts.filter(owner=request.user), many=True)
        return Response(serialized_contacts.data)

class ContactByJobView(APIView):
    permission_classes = [IsAuthenticated]

    def get_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound("Job not found.")

    def get_contact(self, pk):
        try:
            return Contact.objects.filter(job=pk)
        except Contact.DoesNotExist:
            raise NotFound("No contacts found for this job.")

    # GET
    # Get contacts by job id
    def get(self, request, pk):
        job = self.get_job(pk)
        if job.owner != request.user:
          raise PermissionDenied("Unauthorized")
        contacts = self.get_contact(pk=pk)
        serialized_contacts = ContactSerializer(contacts, many=True)
        return Response(serialized_contacts.data)