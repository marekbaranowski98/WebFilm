from django.core.validators import MinValueValidator
from django.db import models

from photos.models import Gallery
from users.models import User


class Collection(models.Model):
    name = models.CharField(max_length=130, )
    gallery = models.OneToOneField(to=Gallery, on_delete=models.CASCADE)


class MovieStatus(models.Model):
    name = models.CharField(max_length=20, blank=False, unique=True, )

    class Meta:
        db_table = 'movies_movie_status'

    def __str__(self):
        return self.name


class Language(models.Model):
    iso_639_1 = models.CharField(max_length=2, primary_key=True, )
    name = models.CharField(max_length=30, blank=True, )


class Country(models.Model):
    iso_3166_1 = models.CharField(max_length=2, primary_key=True, )
    name = models.CharField(max_length=50, blank=False, unique=True, )


class Company(models.Model):
    name = models.CharField(max_length=200, blank=False, unique=True, )


class Keyword(models.Model):
    name = models.CharField(max_length=50, blank=False, unique=True, )


class Genre(models.Model):
    name = models.CharField(max_length=30, blank=False, unique=True, )


class Person(models.Model):
    name = models.CharField(max_length=150, blank=True, default='',)
    surname = models.CharField(max_length=150, blank=True, default='',)
    GENDER_CHOICES = (
        (0, 'Nieokreślona'),
        (1, 'Kobieta'),
        (2, 'Mężczyzna'),
    )
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0,)
    gallery = models.OneToOneField(to=Gallery, on_delete=models.CASCADE)


class Movie(models.Model):
    title = models.CharField(max_length=130, )
    original_title = models.CharField(max_length=130, default='', )
    collection = models.ForeignKey(to=Collection, null=True, default=None, on_delete=models.SET_DEFAULT, )
    release_date = models.DateField(null=True, default=None, )
    genres = models.ManyToManyField(to=Genre, )
    runtime = models.IntegerField(null=True, default=None, validators=[
        MinValueValidator(1, message='Film musi trwać min 1 min.'),
    ], )
    keywords = models.ManyToManyField(to=Keyword, )
    cast = models.ManyToManyField(to=Person, through='Cast', related_name='FK_cast_movie', )
    crew = models.ManyToManyField(to=Person, through='Crew', related_name='FK_crew', )
    original_language = models.ForeignKey(
        to=Language,
        null=True,
        default=None,
        on_delete=models.SET_DEFAULT,
        related_name='FK_original_language',
    )
    production_companies = models.ManyToManyField(to=Company, )
    production_countries = models.ManyToManyField(to=Country, )
    budget = models.DecimalField(null=True, default=None, max_digits=14, decimal_places=2, )
    homepage = models.URLField(max_length=500, null=True, default=None, )
    adult = models.BooleanField(default=False, )
    video = models.BooleanField(default=False, )
    overview = models.TextField(max_length=1500, default='', )
    spoken_languages = models.ManyToManyField(to=Language, related_name='FK_spoken_languages', )
    tagline = models.TextField(max_length=500, default='', )
    gallery = models.OneToOneField(to=Gallery, on_delete=models.CASCADE)
    status = models.ForeignKey(to=MovieStatus, default=1, on_delete=models.RESTRICT, )
    revenue = models.DecimalField(null=True, default=None, max_digits=14, decimal_places=2, )
    average_vote = models.FloatField(null=True, default=None, )
    count_vote = models.IntegerField(null=True, default=None, )
    author = models.ForeignKey(to=User, null=True, default=None, on_delete=models.SET_DEFAULT, )
    visibility = models.BooleanField(default=True, )

    class Meta:
        unique_together = [
            ['title', 'original_title', 'collection', 'release_date', ],
        ]


class Cast(models.Model):
    movie = models.ForeignKey(to=Movie, on_delete=models.CASCADE, related_name='FK_cast_movie', )
    person = models.ForeignKey(to=Person, on_delete=models.RESTRICT, )
    character = models.CharField(max_length=500, )
    order = models.IntegerField(null=False, default=0, )

    class Meta:
        unique_together = [
            ['movie', 'character', 'person', ],
        ]


class Crew(models.Model):
    movie = models.ForeignKey(to=Movie, on_delete=models.CASCADE, related_name='FK_movie', )
    person = models.ForeignKey(to=Person, on_delete=models.RESTRICT, )
    department = models.CharField(max_length=30, )
    job = models.CharField(max_length=80, )

    class Meta:
        unique_together = [
            ['movie', 'department', 'job', 'person', ],
        ]
