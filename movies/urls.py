"""Movies URL Configuration
    path api/movies/latest handles list latest movie
    path api/movies/premiere handles list of upcoming premiere movie
    path api/movies/<int:movie_id> handles page movie by id
    path api/movies/ handles ranking of all movies weight rating
    path api/movies/<str:name>/<str:value>/ handles ranking weighted rating of movies by looking for value in the name
    path api/movies/recommendation/ handles list top movies for logged user
"""
from django.urls import path

from .views import MovieListAPI, MovieAPI


urlpatterns = [
    path('latest/', MovieListAPI.as_view({'get': 'get_latest', }), name='get_list_latest_movie'),
    path('premiere/', MovieListAPI.as_view({'get': 'get_list_premiere', }), name='get_list_premiere_movie'),
    path('<int:movie_id>/', MovieAPI.as_view(), name='get_movie_by_id'),
    path('', MovieListAPI.as_view({'get': 'get_list_top', }), name='get_list_top_all_movie'),
    path('<str:name>/<str:value>/', MovieListAPI.as_view({'get': 'get_list_top_name', }), name='get_list_top_by_name'),
    path('recommendation/', MovieListAPI.as_view({
        'get': 'get_list_recommendation_by_user',
    }), name='get_list_recommendation_by_user'),
]
