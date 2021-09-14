"""Photos URL Configuration

path <slug>/<uuid> bucket uuid from bucket slug
"""
from django.urls import path

from .views import PhotosAPI


urlpatterns = [
    path('<slug:bucket>/<uuid:blob>/', PhotosAPI.as_view(), name='get_photo'),
]
