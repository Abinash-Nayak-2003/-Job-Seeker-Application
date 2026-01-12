from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import QuestionSerializer, FeedbackSerializer
from adminpanel.models import Question, Feedback

class UserQuestionCreateView(CreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)

class UserFeedbackCreateView(CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)
