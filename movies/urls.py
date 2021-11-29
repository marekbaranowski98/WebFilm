"""Movies URL Configuration
    path api/movies/latest handles list latest movie
    path api/movies/<int:movie_id> handles page movie by id
"""
from django.urls import path

from .views import MovieLatestAPI, MovieAPI


urlpatterns = [
    path('latest/', MovieLatestAPI.as_view(), name='list_latest_movie'),
    path('<int:movie_id>/', MovieAPI.as_view(), name='get_movie_by_id')
]
