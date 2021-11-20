"""Movies URL Configuration
    path api/movies/latest handles list latest movie
"""
from django.urls import path

from .views import MovieLatestAPI


urlpatterns = [
    path('latest/', MovieLatestAPI.as_view(), name='list_latest_movie'),
]
