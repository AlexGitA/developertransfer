from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Mentorship
from .serializers import MentorshipSerializer
from .permissions import IsMentorOrMentee, IsMentor, IsMentee
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class MentorshipViewSet(viewsets.ModelViewSet):
    serializer_class = MentorshipSerializer
    permission_classes = [IsMentorOrMentee]

    def get_queryset(self):
        user = self.request.user
        return Mentorship.objects.filter(
            Q(mentor=user) | Q(mentee=user)
        ).select_related('mentor', 'mentee')

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsMentorOrMentee]
        elif self.action == 'create':
            self.permission_classes = [IsMentee]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(mentee=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status not in ['pending', 'rejected']:
            return Response(
                {"detail": "Cannot delete an accepted connection"},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class MentorshipConnectionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        connections = Mentorship.objects.filter(
            Q(mentor=user) | Q(mentee=user),
            status='accepted'
        ).select_related('mentor', 'mentee')

        data = []
        for conn in connections:
            other_user = conn.mentee if conn.mentor == user else conn.mentor
            data.append({
                'id': other_user.id,
                'full_name': other_user.full_name,
                'image': other_user.image,
                'status': conn.status,
                'role': 'mentor' if conn.mentor == user else 'mentee'
            })

        return Response(data)