import logging

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.request import Request

from photos.serializers import PhotoSerializer
from photos.models import Photo
from .serializers import ListMovieSerializer
from .models import Movie, MovieStatus

loggerDebug = logging.getLogger('debug')


class MovieLatestAPI(generics.ListAPIView):
    serializer_class = ListMovieSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Get list latest movie with status  released

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            list_movies = self.get_serializer(Movie.objects.filter(
                status=MovieStatus.objects.get(name='Released')
            ).order_by('-release_date')[:20], many=True).data

            for movie in list_movies:
                movie['posterURL'] = PhotoSerializer(Photo.objects.get(gallery=movie.get('gallery'))).data

            return Response(data=list_movies, status=200)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=400)
