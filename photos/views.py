import base64
import tempfile

from rest_framework import generics
from rest_framework.request import Request
from rest_framework.response import Response
from google.auth.credentials import AnonymousCredentials
from google.api_core.client_options import ClientOptions
from google.cloud import storage
from WebFilm import settings


class PhotosAPI(generics.RetrieveAPIView):
    def dispatch(self, request: Request, *args, **kwargs):
        self.__client = storage.Client(
            credentials=AnonymousCredentials(),
            project="webfilm",
            client_options=ClientOptions(api_endpoint=settings.URL_GCS),
        )
        return super(PhotosAPI, self).dispatch(request, *args, **kwargs)

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Return image base64

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        bucket = self.__client.bucket(kwargs['bucket'])
        blob = bucket.blob(str(kwargs['blob']))
        try:
            with tempfile.NamedTemporaryFile() as temp_file:
                blob.download_to_filename(temp_file.name)
                temp_file.seek(0, 0)
                image = base64.b64encode(temp_file.read())
            return Response({'image': image}, status=200)
        except:
            return Response(status=404)
