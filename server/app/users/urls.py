from django.urls import path
from .views import RegisterView, LoginView, AuthUserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('signup/', RegisterView.as_view(), name='signup'),  # Alias for signup
    path('login/', LoginView.as_view(), name='login'),
    path('auth-user/', AuthUserView.as_view(), name='auth_user'),
]