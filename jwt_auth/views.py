from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()
import jwt
from datetime import datetime, timedelta
from django.conf import settings # this line imports settings as variables for using things like SECRET_KEY

from .serializers.common import UserSerializer

# Create your views here.
class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        # ✅ FIXED LINE
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            print("FAILED AT EMAIL STAGE")
            raise PermissionDenied("Invalid credentials")

        if not user_to_login.check_password(password):
            print("FAILED AT PASSWORD STAGE")
            raise PermissionDenied("Invalid credentials")
        

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {
                "sub": user_to_login.id,
                "exp": int(dt.timestamp())  # <-- Use timestamp() instead of strftime('%s')
            },
            settings.SECRET_KEY,
            algorithm="HS256"
        )


        return Response({ "token": token, "message": f"Welcome back {user_to_login.first_name}" })
