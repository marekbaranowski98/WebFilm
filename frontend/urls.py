"""Frontend URL Configuration

path / load react app
"""
from django.conf.urls import url
from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    url(r'^(?!(api|docs)).*$', index),
]
