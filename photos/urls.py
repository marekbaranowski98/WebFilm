"""Photos URL Configuration

path <slug>/<uuid> blob uuid from bucket slug
path <slug>/<uuid> post uuid blob to bucket slug
"""
from django.urls import path

from .views import PhotosAPI


urlpatterns = [
    path('<slug:bucket>/<uuid:blob>/', PhotosAPI.as_view(), name='get_post_photo'),
]
