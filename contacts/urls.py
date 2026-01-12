from django.urls import path
from .views import ContactListView, ContactDetailView, ContactByCompanyView, ContactByJobView

urlpatterns = [
  path('', ContactListView.as_view()),
  path('<int:pk>/', ContactDetailView.as_view()),
  path('company<int:pk>/', ContactByCompanyView.as_view()),
  path('job<int:pk>/', ContactByJobView.as_view()),
]