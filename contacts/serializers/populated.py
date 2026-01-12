from .common import ContactSerializer
from jwt_auth.serializers.common import UserSerializer
from jobs.serializers.common import JobSerializer
from companies.serializers.common import CompanySerializer

class PopulatedContactSerializer(ContactSerializer):
    owner = UserSerializer()
    job = JobSerializer()
    company = CompanySerializer()