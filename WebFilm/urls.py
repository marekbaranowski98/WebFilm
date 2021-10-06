"""WebFilm URL Configuration

path docs/ loads url from apps docs
path / loads url from apps frontend
path api/users/ loads url from apps users
path api/photos loads url from app photos
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', include('docs.urls')),
    path('api/users/', include('users.urls')),
    path('api/photos/', include('photos.urls')),
    path('', include('frontend.urls')),
]
