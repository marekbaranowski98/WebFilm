"""Users URL Configuration

path login/ handles login requests
path register/ handles register requests
"""
from django.urls import path
from .views import RegisterAPI, LoginAPI, UserAPI

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='login'),
    path('', RegisterAPI.as_view(), name='register'),
]
