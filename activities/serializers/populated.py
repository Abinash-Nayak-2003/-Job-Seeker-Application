from .common import ActivitySerializer
from jwt_auth.serializers.common import UserSerializer
from jobs.serializers.common import JobSerializer

class PopulatedActivitySerializer(ActivitySerializer):
    owner = UserSerializer()
    job = JobSerializer()