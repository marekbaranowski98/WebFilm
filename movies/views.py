import logging

from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.request import Request

from photos.serializers import PhotoSerializer
from photos.models import Photo
from .models import Movie, MovieStatus, Cast, Crew
from .serializers import ListMovieSerializer, MovieSerializer, CastSerializer, CrewSerializer

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
                movie['posterURL'] = PhotoSerializer(Photo.objects.get(gallery=movie.get('gallery'), order=1)).data

            return Response(data=list_movies, status=200)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)


class MovieAPI(generics.RetrieveAPIView):
    serializer_class = MovieSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Get movie by id
        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            m = Movie.objects.get(pk=kwargs.get('movie_id'))
            if m.visibility is False:
                raise PermissionDenied()
            movie = self.get_serializer(m).data

            movie['posterURL'] = PhotoSerializer(Photo.objects.filter(gallery=movie.get('gallery')), many=True, ).data

            movie['cast'] = CastSerializer(
                Cast.objects.filter(movie_id=movie.get('id')).order_by('order')[:20], many=True
            ).data
            for c in movie['cast']:
                c['person']['posterURL'] = PhotoSerializer(
                    Photo.objects.filter(gallery=c.get('person').get('gallery'))[0:1], many=True,
                ).data

            movie['crew'] = CrewSerializer(Crew.objects.filter(movie_id=movie.get('id'))[:20], many=True).data
            for c in movie['crew']:
                c['person']['posterURL'] = PhotoSerializer(
                    Photo.objects.filter(gallery=c.get('person').get('gallery'))[0:1], many=True,
                ).data

            return Response(data=movie, status=200)
        except Movie.DoesNotExist:
            return Response(status=404)
        except PermissionDenied:
            return Response(status=410)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)
