from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),

    # Todo URLs
    path("todo/<user_id>/", views.TodoListView.as_view(), name="todo_list"),
    path("todo-detail/<user_id>/<todo_id>/", views.TodoDetailView.as_view(), name="todo_detail"),
    path("todo-mark-as-completed/<user_id>/<todo_id>/", views.TodoMarkAsCompleted.as_view(), name="todo_mark_completed"),

    # Chat/Text Messaging Functionality
    path("my-messages/<user_id>/", views.MyInbox.as_view(), name="my_messages"),
    path("get-messages/<sender_id>/<reciever_id>/", views.GetMessages.as_view(), name="get_messages"),
    path("send-messages/", views.SendMessages.as_view(), name="send_messages"),

    # Get profile
    path("profile/<int:pk>/", views.ProfileDetail.as_view(), name="profile_detail"),
    path("search/<username>/", views.SearchUser.as_view(), name="search_user"),
]

