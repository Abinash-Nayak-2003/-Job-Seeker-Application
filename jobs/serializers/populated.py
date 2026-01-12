from .common import JobSerializer
from jwt_auth.serializers.common import UserSerializer
from activities.serializers.common import ActivitySerializer
from companies.serializers.common import CompanySerializer
from contacts.serializers.common import ContactSerializer

class PopulatedJobSerializer(JobSerializer):
    owner = UserSerializer()
    activities = ActivitySerializer(many=True)
    companies = CompanySerializer(many=True)