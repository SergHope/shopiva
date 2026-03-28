from django.urls import path
from .views import RegisterView, MeView, UpdateMeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
    path('update/', UpdateMeView.as_view(), name='update-me'),
]