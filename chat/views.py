from django.db.models import OuterRef, Subquery
from django.db.models import Q
from rest_framework.views import APIView

from chat.models import Todo, Profile, ChatMessage
from django.contrib.auth.models import User


from chat.serializer import MyTokenObtainPairSerializer, RegisterSerializer, TodoSerializer, MessageSerializer, ProfileSerializer,UserSerializer

from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

# chat/views.py
from rest_framework import generics
from chat.models import Profile
from chat.serializer import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

class AllUsersView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Gebe alle Profile zurück, außer dein eigenes
        return Profile.objects.exclude(user=self.request.user)



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully", "user": user.id})
        return Response(serializer.errors, status=400)


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        todo = Todo.objects.filter(user=user)
        return todo


class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        todo_id = self.kwargs['todo_id']

        user = User.objects.get(id=user_id)
        todo = Todo.objects.get(id=todo_id, user=user)

        return todo


class TodoMarkAsCompleted(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        todo_id = self.kwargs['todo_id']

        user = User.objects.get(id=user_id)
        todo = Todo.objects.get(id=todo_id, user=user)

        todo.completed = True
        todo.save()

        return todo


# Chat APp
class MyInbox(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = ChatMessage.objects.filter(
            id__in =  Subquery(
                User.objects.filter(
                    Q(sender__reciever=user_id) |
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id) |
                            Q(reciever=OuterRef('id'),sender=user_id)
                        ).order_by('-id')[:1].values_list('id',flat=True)
                    )
                ).values_list('last_msg', flat=True).order_by("-id")
            )
        ).order_by("-id")

        return messages

class GetMessages(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        reciever_id = self.kwargs['reciever_id']
        messages =  ChatMessage.objects.filter(sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id])
        return messages

class SendMessages(generics.CreateAPIView):
    serializer_class = MessageSerializer



class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]


class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs.get('username', '')
        mentorship_mode = self.request.query_params.get('mentorshipMode', '')
        field = self.request.query_params.get('field', '')
        language = self.request.query_params.get('language', '')
        country = self.request.query_params.get('country', '')
        verified = self.request.query_params.get('verified', 'false').lower() == 'true'
        top_rated = self.request.query_params.get('topRated', 'false').lower() == 'true'
        local_only = self.request.query_params.get('localOnly', 'false').lower() == 'true'

        qs = Profile.objects.all()

        qs = qs.filter(
            Q(user__username__icontains=username) |
            Q(full_name__icontains=username) |
            Q(user__email__icontains=username)
        )

        if mentorship_mode:
            if mentorship_mode == 'mentor':
                qs = qs.filter(user__details__mentor=True)
            elif mentorship_mode == 'mentee':
                qs = qs.filter(user__details__mentor=False)
        if field:
            qs = qs.filter(user__details__current_role__icontains=field)
        if language:
            qs = qs.filter(user__details__preferred_language__iexact=language)
        if country:
            qs = qs.filter(user__details__country__iexact=country)
        if verified:
            qs = qs.filter(user__details__is_verified=True)

        return qs.exclude(user=self.request.user)

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if not qs.exists():
            return Response({"detail": "No users found."}, status=404)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
