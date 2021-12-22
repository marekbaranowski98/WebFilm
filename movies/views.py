import logging
import operator

from rest_framework import generics, viewsets, permissions
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from rest_framework.response import Response
from rest_framework.request import Request

from photos.serializers import PhotoSerializer
from photos.models import Photo
from .models import Movie, MovieStatus, Cast, Crew, Genre
from .serializers import ListMovieSerializer, MovieSerializer, CastSerializer, CrewSerializer
from .permissions import MovieIsVisibility
from evaluations.models import Rating
from evaluations.helpers import weighted_rating, build_list_recommendation_to_user

loggerDebug = logging.getLogger('debug')


class MovieListAPI(generics.ListAPIView, viewsets.ViewSet):
    serializer_class = ListMovieSerializer

    def get_permissions(self):
        if self.action == 'get_list_recommendation_by_user':
            self.permission_classes = [permissions.IsAuthenticated, MovieIsVisibility, ]
        else:
            self.permission_classes = [MovieIsVisibility, ]

        return super(MovieListAPI, self).get_permissions()

    def __build_list_image(self, list_movies: ListMovieSerializer):
        for movie in list_movies:
            movie['poster_url'] = PhotoSerializer(Photo.objects.get(gallery=movie.get('gallery'), order=1)).data

        return list_movies

    def get_latest(self, request: Request, *args, **kwargs) -> Response:
        """
        Get list latest movie with status released

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            list_movies = self.get_serializer(Movie.objects.filter(
                status=MovieStatus.objects.get(name='Released'), visibility=True,
            ).order_by('-release_date')[:20], many=True).data
            self.__build_list_image(list_movies)

            return Response(data=list_movies, status=200)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)

    def get_list_top(self, request: Request, *args, **kwargs) -> Response:
        """
        Get list of top weighted rating all movies

        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        try:
            queryset = Movie.objects.filter(visibility=True).all()

            list_movies = self.get_serializer(sorted(
                weighted_rating(queryset, 0.95), key=operator.attrgetter('wr'), reverse=True
            )[:20], many=True).data
            self.__build_list_image(list_movies)

            return Response(data=list_movies, status=200)
        except Movie.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)

    def get_list_top_name(self, request: Request, *args, **kwargs) -> Response:
        """
        Get list of top weighted rating movies looking for value in the name

        :param request: Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            if self.kwargs.get('name') == 'genres':
                filter_movie = {'genres': Genre.objects.get(name=self.kwargs.get('value')).id, }
            elif self.kwargs.get('name') == 'countries':
                filter_movie = {'production_countries':  self.kwargs.get('value'), }
            else:
                raise Movie.DoesNotExist

            queryset = Movie.objects.filter(
                **filter_movie,
                visibility=True
            ).all()

            list_movies = self.get_serializer(sorted(
                weighted_rating(queryset, 0.8), key=operator.attrgetter('wr'), reverse=True
            )[:20], many=True).data
            self.__build_list_image(list_movies)

            return Response(data=list_movies, status=200)
        except Movie.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)

    def get_list_premiere(self, request: Request, *args, **kwargs) -> Response:
        """
        Get list of upcoming movies with status In Production, Planned or Post Production

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            list_movies = self.get_serializer(Movie.objects.filter(
                status__in=MovieStatus.objects.filter(name__in=['In Production', 'Planned', 'Post Production', ]),
                # release_date__gt=datetime.date.today(),
                visibility=True, release_date__isnull=False,
            ).order_by('release_date')[:20], many=True).data
            self.__build_list_image(list_movies)

            return Response(data=list_movies, status=200)
        except Movie.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)

    def get_list_recommendation_by_user(self, request: Request, *args, **kwargs) -> Response:
        """
        Get list top movies for logged user

        :param request: Request
        :param args:
        :param kwargs:
        :return: Response
        """
        try:
            if Rating.objects.filter(user_id=request.user.id).count() < 10:
                raise ValueError

            queryset = Movie.objects.filter(visibility=True).all()

            list_movies = self.get_serializer(sorted(
                build_list_recommendation_to_user(queryset, request.user.id),
                key=operator.attrgetter('est'), reverse=True
            )[:20], many=True).data
            self.__build_list_image(list_movies)

            return Response(data=list_movies, status=200)
        except ValueError:
            return Response(data={'error': 'Oceń minimum 10 filmów.'}, status=403)
        except Movie.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)


class MovieAPI(generics.RetrieveAPIView):
    serializer_class = MovieSerializer
    permission_classes = [MovieIsVisibility, ]

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Get movie by id
        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            m = Movie.objects.get(pk=self.kwargs.get('movie_id'))
            self.check_object_permissions(self.request, m)
            movie = self.get_serializer(m).data

            movie['poster_url'] = PhotoSerializer(Photo.objects.filter(gallery=movie.get('gallery')), many=True, ).data

            movie['cast'] = CastSerializer(
                Cast.objects.filter(movie_id=movie.get('id')).order_by('order')[:20], many=True
            ).data
            for c in movie['cast']:
                c['person']['poster_url'] = PhotoSerializer(
                    Photo.objects.filter(gallery=c.get('person').get('gallery'))[0:1], many=True,
                ).data

            movie['crew'] = CrewSerializer(Crew.objects.filter(movie_id=movie.get('id'))[:20], many=True).data
            for c in movie['crew']:
                c['person']['poster_url'] = PhotoSerializer(
                    Photo.objects.filter(gallery=c.get('person').get('gallery'))[0:1], many=True,
                ).data

            return Response(data=movie, status=200)
        except Movie.DoesNotExist:
            return Response(status=404)
        except (NotAuthenticated, PermissionDenied):
            return Response(data={'detail': 'Dane nie są już dostępne.'}, status=410)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)
