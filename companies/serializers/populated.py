from .common import CompanySerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedCompanySerializer(CompanySerializer):
    owner = UserSerializer()