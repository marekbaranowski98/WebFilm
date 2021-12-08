from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from movies.models import Movie
from users.models import User


class Rating(models.Model):
    movie = models.ForeignKey(to=Movie, on_delete=models.CASCADE, )
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, )
    rating = models.IntegerField(validators=[
        MinValueValidator(1, message='Najniższa dostępna ocena to 1.'),
        MaxValueValidator(10, message='Najwyższa dostępna ocena to 10.'),
    ], )
    date = models.DateTimeField(auto_now=True, )

    class Meta:
        unique_together = [
            ['movie', 'user', ],
        ]
