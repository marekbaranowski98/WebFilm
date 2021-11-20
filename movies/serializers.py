from rest_framework import serializers

from .models import Movie


class ListMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'gallery')
