from .common import NoteSerializer
from jwt_auth.serializers.common import UserSerializer
from jobs.serializers.common import JobSerializer

class PopulatedNoteSerializer(NoteSerializer):
    owner = UserSerializer()
    job = JobSerializer()