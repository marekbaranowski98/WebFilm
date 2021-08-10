"""WebFilm URL Configuration

path docs/ loads url from apps docs
path / loads url from apps frontend
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', include('docs.urls')),
    path('', include('frontend.urls')),
]
