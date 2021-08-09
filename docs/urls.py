"""Docs URL Configuration

path api/ load swagger docs api
"""
from django.urls import path
from .views import show_api_docs

urlpatterns = [
    path('api/', show_api_docs),
]
