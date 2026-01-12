from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from jwt_auth.utils import generate_jwt# your custom JWT function
from jwt_auth.models import User
from .models import Question, Feedback
from .serializers import QuestionSerializer, FeedbackSerializer
from .permissions import IsAdminUser


# ----------------------------
# Admin Login Endpoint
# ----------------------------
class AdminLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None and user.is_staff:
            token = generate_jwt(user)
            return Response({
                'id': user.id,
                'username': user.username,
                'is_admin': True,
                'token': token
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# ----------------------------
# Admin Dashboard
# ----------------------------
class AdminDashboard(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_users = User.objects.count()
        logged_in_users = User.objects.filter(last_login__isnull=False).count()
        return Response({
            "total_users": total_users,
            "logged_in_users": logged_in_users
        })


# ----------------------------
# Admin Questions
# ----------------------------
class AdminQuestions(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


# ----------------------------
# Admin Feedback
# ----------------------------
class AdminFeedback(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)
