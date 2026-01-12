from rest_framework import serializers
from adminpanel.models import Question, Feedback   # <-- correct path

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question', 'is_resolved', 'created_at']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'message', 'rating', 'created_at']
