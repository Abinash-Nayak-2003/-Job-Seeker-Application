from rest_framework import serializers
from jwt_auth.models import User
from .models import Question, Feedback

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'last_login_time']


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Question
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Feedback
        fields = '__all__'
