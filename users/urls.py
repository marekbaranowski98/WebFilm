"""Users URL Configuration

path register/ handles register requests
"""
from django.urls import path
from .views import RegisterAPI

urlpatterns = [
    path('', RegisterAPI.as_view(), name='register'),
]
