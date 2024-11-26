from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer


# Helper Function to Blacklist User's Tokens
def blacklist_user_tokens(user):
    """Blacklist all outstanding tokens for a user."""
    tokens = OutstandingToken.objects.filter(user=user)
    for token in tokens:
        try:
            BlacklistedToken.objects.get_or_create(token=token)
        except Exception:
            pass  # Skip already blacklisted tokens


# Register View
class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = User.objects.get(username=request.data['username'])

        # Blacklist existing tokens for this user (if any)
        blacklist_user_tokens(user)

        # Generate new tokens for the registered user
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "User registered successfully.",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data,
        })


# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            # Blacklist all previous tokens
            blacklist_user_tokens(user)

            # Issue new tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data,
            })
        else:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)


# Authenticated User View
class AuthUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)
