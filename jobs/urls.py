from django.urls import path
from .views import JobListView, JobDetailView, JobStatusView

urlpatterns = [
  path('', JobListView.as_view()),
  path('<int:pk>/', JobDetailView.as_view()),
  path('status<pk>/', JobStatusView.as_view()),
]