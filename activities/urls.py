from django.urls import path
from .views import ActivityListView, ActivityDetailView, ActivityByJobView, ActivityByStatusView, ActivityPastDueView, ActivityDueTodayView, ActivityUpcomingView

urlpatterns = [
  path('', ActivityListView.as_view()),
  path('<int:pk>/', ActivityDetailView.as_view()),
  path('job<int:pk>/', ActivityByJobView.as_view()),
  path('completed<pk>/', ActivityByStatusView.as_view()),
  path('past/', ActivityPastDueView.as_view()),
  path('today/', ActivityDueTodayView.as_view()),
  path('upcoming/', ActivityUpcomingView.as_view()),
]