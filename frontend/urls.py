"""Frontend URL Configuration

path / load react app
"""
from django.urls import path
from .views import index

urlpatterns = [
    path('', index)
]
