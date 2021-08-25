from knox.models import AuthToken
from rest_framework import generics
from rest_framework.response import Response

from WebFilm import settings
from .serializer import RegisterSerializer, UserSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = AuthToken.objects.create(user)[1]
        response = Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })
        response.set_cookie('token', token, httponly=settings.SESSION_COOKIE_HTTPONLY)
        return response
