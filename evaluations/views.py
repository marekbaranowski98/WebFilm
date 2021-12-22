import logging

from rest_framework import generics, viewsets
from rest_framework import permissions
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from rest_framework.request import Request
from rest_framework.response import Response

from movies.permissions import MovieIsVisibility
from .serializers import RatingUserSerializer, DeleteRatingUserSerializer
from .models import Rating
from .helpers import estimate_rating_user

loggerEvaluation = logging.getLogger(__name__)
loggerDebug = logging.getLogger('debug')


class RatingUserAPI(generics.RetrieveAPIView, viewsets.ViewSet):
    serializer_class = RatingUserSerializer
    permission_classes = [permissions.IsAuthenticated, MovieIsVisibility, ]

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Get rating logged user for movie from url
        :param request: Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            m = kwargs.get('movie_id')
            r = Rating.objects.get(movie_id=m, user_id=request.user.id)
            self.check_object_permissions(self.request, r.movie)

            return Response(data=self.get_serializer(r).data, status=200)
        except Rating.DoesNotExist:
            return Response(data={
                'estimate': estimate_rating_user(user_id=request.user.id, movie_id=kwargs.get('movie_id')),
            }, status=200)
        except (NotAuthenticated, PermissionDenied):
            return Response(data={'detail': 'Dane nie są już dostępne.'}, status=410)
        except Exception as e:
            return Response(status=500)

    def put(self, request, *args, **kwargs):
        """
        Create or update rating logged user for movie
        :param request: Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            rating = self.get_serializer(data=request.data, context={'request': request}, )
            if rating.is_valid():
                self.check_object_permissions(self.request, rating.validated_data['movie'])
                loggerEvaluation.info(
                    f'User {rating.validated_data["user"].id} rated movie {rating.validated_data["movie"].id} '
                    f'it {rating.validated_data["rating"]}.'
                )
                rating.save()
                return Response(status=204)
            else:
                return Response(rating.errors, status=400)
        except (NotAuthenticated, PermissionDenied):
            return Response(data={'detail': 'Film nie są już dostępny.'}, status=410)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)

    def delete(self, request, *args, **kwargs):
        """
        Delete rating logged user for movie
        :param request: Request
        :param args:
        :param kwargs:
        :return: Response
        """
        try:
            rating = DeleteRatingUserSerializer(data=request.data, context={'request': request},)
            if rating.is_valid():
                rating = Rating.objects.get(**rating.validated_data)
                rating.delete()
                loggerEvaluation.info(
                    f'User {rating.user.id} deleted rating movie {rating.movie.id}.'
                )
                return Response(data={
                    'estimate': estimate_rating_user(user_id=request.user.id, movie_id=kwargs.get('movie_id')),
                }, status=200)
            else:
                return Response(rating.errors, status=400)
        except Rating.DoesNotExist:
            return Response(status=404)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=500)
