from django.urls import path
from .views import RegisterView, MeView, UpdateMeView, AllUsersView, ChangeRoleView, DeleteUserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
    path('update/', UpdateMeView.as_view(), name='update-me'),
    path('all/', AllUsersView.as_view(), name='all-users'),
    path('<int:pk>/change-role/', ChangeRoleView.as_view(), name='change-role'),
    path('<int:pk>/delete/', DeleteUserView.as_view(), name='delete-user'),
]