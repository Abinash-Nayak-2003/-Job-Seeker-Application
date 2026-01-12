from django.urls import path
from .views import UserQuestionCreateView, UserFeedbackCreateView

urlpatterns = [
    path('questions/', UserQuestionCreateView.as_view()),
    path('feedback/', UserFeedbackCreateView.as_view()),
]
