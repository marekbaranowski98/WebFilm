"""WebFilm URL Configuration

path docs/ loads url from apps docs
path / loads url from apps frontend
path api/users/ loads url from apps users
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', include('docs.urls')),
    path('api/users/', include('users.urls')),
    path('', include('frontend.urls')),
]
