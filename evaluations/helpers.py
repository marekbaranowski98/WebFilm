import numpy as np

from django.db.models import Avg


def weighted_rating(queryset_movie, percentile=0.85):
    min_count = np.quantile(queryset_movie.values_list('count_vote', flat=True), percentile)
    mean_movie = queryset_movie.aggregate(Avg('average_vote'))['average_vote__avg']
    movies = queryset_movie.all()
    for movie in movies:
        tmp = movie.count_vote + min_count
        movie.wr = movie.average_vote * movie.count_vote / tmp + mean_movie * min_count / tmp

    return movies
