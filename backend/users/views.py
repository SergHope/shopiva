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

class AllUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'admin':
            return Response({'error': 'Yetkisiz erişim!'}, status=403)
        users = User.objects.all()
        data  = [{'id': u.id, 'username': u.username, 'email': u.email, 'role': u.role} for u in users]
        return Response(data)

class ChangeRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        if request.user.role != 'admin':
            return Response({'error': 'Yetkisiz erişim!'}, status=403)
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({'error': 'Kullanıcı bulunamadı!'}, status=404)
        user.role = request.data.get('role', user.role)
        user.save()
        return Response({'id': user.id, 'username': user.username, 'role': user.role})

class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        if request.user.role != 'admin':
            return Response({'error': 'Yetkisiz erişim!'}, status=403)
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({'error': 'Kullanıcı bulunamadı!'}, status=404)
        user.delete()
        return Response({'message': 'Kullanıcı silindi!'})