from django.urls import path
from .views import CompanyListView, CompanyDetailView, CompanyByJobView

urlpatterns = [
  path('', CompanyListView.as_view()),
  path('<int:pk>/', CompanyDetailView.as_view()),
  path('job<int:pk>/', CompanyByJobView.as_view()),
]