import logging

from rest_framework import generics
from rest_framework.request import Request
from rest_framework.response import Response
from google.api_core import exceptions

from WebFilm.helpers import default_uuid
from .Files import FileManager


loggerDebug = logging.getLogger('debug')


class PhotosAPI(generics.RetrieveAPIView):
    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Return image base64

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        try:
            image = FileManager().get_file(str(kwargs['bucket']), str(kwargs['blob']))
            return Response({'image': image}, status=200)
        except exceptions.NotFound:
            image = FileManager().get_file(str(kwargs['bucket']), default_uuid())
            return Response({'image': image}, status=404)
        except Exception as e:
            loggerDebug.debug(e)
            return Response(status=400)
