from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()


class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        print('HITS AUTHENTICATE MIDDLEWARE')

        header = request.headers.get('Authorization')
        if not header:
            return None

        if not header.startswith('Bearer '):
            raise PermissionDenied('Invalid Token')

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=['HS256'],
            )

            # ✅ SUPPORT BOTH USER & ADMIN TOKENS
            user_id = payload.get('user_id') or payload.get('sub')

            if not user_id:
                raise PermissionDenied('Invalid Token Payload')

            user = User.objects.get(id=user_id)
            print('Authenticated:', user.username)

        except jwt.ExpiredSignatureError:
            raise PermissionDenied('Token expired')

        except jwt.InvalidTokenError:
            raise PermissionDenied('Invalid Token')

        except User.DoesNotExist:
            raise PermissionDenied('User not found')

        return (user, token)

