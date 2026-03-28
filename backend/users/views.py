from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import RegisterSerializer
from .models import User

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email    = attrs.get('username')
        password = attrs.get('password')
        user     = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            attrs['username'] = user.username
        return super().validate(attrs)

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset           = User.objects.all()
    serializer_class   = RegisterSerializer
    permission_classes = [AllowAny]

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id':       user.id,
            'username': user.username,
            'email':    user.email,
            'role':     user.role,
        })

class UpdateMeView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user         = request.user
        username     = request.data.get('username', user.username)
        email        = request.data.get('email', user.email)
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if new_password:
            if not user.check_password(old_password):
                return Response({'error': 'Mevcut şifre hatalı!'}, status=400)
            user.set_password(new_password)

        user.username = username
        user.email    = email
        user.save()
        return Response({
            'id':       user.id,
            'username': user.username,
            'email':    user.email,
            'role':     user.role,
        })