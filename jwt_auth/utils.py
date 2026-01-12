import jwt
from datetime import datetime, timedelta
from django.conf import settings

def generate_jwt(user):
    payload = {
        'user_id': user.id,
        'username': user.username,
        'is_admin': True if user.is_staff else False,
        'exp': datetime.utcnow() + timedelta(hours=24)  # token valid 24h
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token
