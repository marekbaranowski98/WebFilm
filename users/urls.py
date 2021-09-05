"""Users URL Configuration

path login/ handles login requests
path me/ check is user logged
path register/ handles register requests
"""
from django.urls import path

from .views import RegisterAPI, CheckLoginUserAPI, LoginAPI

urlpatterns = [
    path('login/', LoginAPI.as_view({'post': 'post'}), name='login'),
    path('me/', CheckLoginUserAPI.as_view(), name='check_login'),
    path('me/logout/', LoginAPI.as_view({'get': 'get'}), name='logout_user'),
    path('', RegisterAPI.as_view(), name='register'),
]
