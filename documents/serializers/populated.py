from .common import DocumentSerializer
from jwt_auth.serializers.common import UserSerializer
from jobs.serializers.common import JobSerializer

class PopulatedDocumentSerializer(DocumentSerializer):
    owner = UserSerializer()
    job = JobSerializer()