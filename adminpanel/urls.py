from django.urls import path
from .views import AdminDashboard, AdminQuestions, AdminFeedback, AdminLogin

urlpatterns = [
    path('dashboard/', AdminDashboard.as_view()),
    path('questions/', AdminQuestions.as_view()),
    path('feedback/', AdminFeedback.as_view()),
    path('login/', AdminLogin.as_view()), 
]
