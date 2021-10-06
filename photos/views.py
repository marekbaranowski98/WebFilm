from rest_framework import generics
from rest_framework.request import Request
from rest_framework.response import Response

from .Files import FileManager


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
        except:
            return Response(status=404)
