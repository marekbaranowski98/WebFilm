"""Users URL Configuration

path login/ handles login requests
path me/ check is user logged
path me/logout/ logout users
path me/validator-unique/ check if data available
path act/<uuid:key>/ active user
path me/reset-password/ reset password
path me/reset-password/<uuid:key> link to reset password
path / handles register requests
path <slug:login> handles page user
"""
from django.urls import path

from .views import RegisterAPI, CheckLoginUserAPI, LoginAPI, ValidationUserDataAPI, ActiveUserAPI, \
    ResetPasswordAPI, GetUser

urlpatterns = [
    path('login/', LoginAPI.as_view({'post': 'post'}), name='login'),
    path('me/', CheckLoginUserAPI.as_view(), name='check_login'),
    path('me/logout/', LoginAPI.as_view({'get': 'get'}), name='logout_user'),
    path('me/validator-unique/', ValidationUserDataAPI.as_view(), name='validation_user'),
    path('act/<uuid:key>/', ActiveUserAPI.as_view(), name='active_user'),
    path('me/reset-password/', ResetPasswordAPI.as_view({'post': 'post'}), name='request_reset_password'),
    path('me/reset-password/<uuid:key>/', ResetPasswordAPI.as_view({'patch': 'patch'}), name='reset_password'),
    path('', RegisterAPI.as_view(), name='register'),
    path('<slug:login>/', GetUser.as_view(), name='get_user'),
]
