"""Users URL Configuration

path login/ handles login requests
path me/ check is user logged
path me/logout/ logout users
path me/validator-unique/ check if data available
path act<uuid:key>/ active user
path / handles register requests
"""
from django.urls import path

from .views import RegisterAPI, CheckLoginUserAPI, LoginAPI, ValidationUserDataAPI, ActiveUserAPI

urlpatterns = [
    path('login/', LoginAPI.as_view({'post': 'post'}), name='login'),
    path('me/', CheckLoginUserAPI.as_view(), name='check_login'),
    path('me/logout/', LoginAPI.as_view({'get': 'get'}), name='logout_user'),
    path('me/validator-unique/', ValidationUserDataAPI.as_view(), name='validation_user'),
    path('act/<uuid:key>/', ActiveUserAPI.as_view(), name='active_user'),
    path('', RegisterAPI.as_view(), name='register'),
]
