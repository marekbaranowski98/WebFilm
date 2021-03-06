import numpy as np

from django.db.models import Avg

from .models import Movie
from WebFilm.settings import algorithm


def weighted_rating(queryset_movie, percentile=0.85):
    queryset_movie = queryset_movie.filter(average_vote__isnull=False).all()
    if len(queryset_movie) == 0:
        raise Movie.DoesNotExist
    min_count = np.quantile(queryset_movie.values_list('count_vote', flat=True), percentile)
    mean_movie = queryset_movie.aggregate(Avg('average_vote'))['average_vote__avg']
    movies = queryset_movie.all()
    for movie in movies:
        tmp = movie.count_vote + min_count
        movie.wr = movie.average_vote * movie.count_vote / tmp + mean_movie * min_count / tmp

    return movies


def build_list_recommendation_to_user(queryset_movie, user_id):
    u = str(user_id)
    movies = queryset_movie.all()
    for movie in movies:
        movie.est = estimate_rating_user(movie_id=str(movie.id), user_id=u)

    return movies


def estimate_rating_user(movie_id: str, user_id: str):
    return algorithm.predict(uid=user_id, iid=movie_id).est
