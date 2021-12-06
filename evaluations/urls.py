"""Evaluations URL Configuration
path / handles create/update/delete rating
path /movie/<int:movie_id>/ get rating
"""
from django.urls import path

from .views import RatingUserAPI


urlpatterns = [
    path('', RatingUserAPI.as_view({
        'put': 'put',
        'delete': 'delete',
    }), name='manage_rating_movie'),
    path('movie/<int:movie_id>/', RatingUserAPI.as_view({'get': 'get', }), name='get_rating_movie_to_user'),
]
