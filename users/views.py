from rest_framework.authtoken.models import Token
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from .serializer import RegisterSerializer, LoginUserSerializer, UserSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            response = Response({
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
            })
            response.status_code = 201
            return response
        else:
            response = Response({
                'errors': serializer.errors,
            })
            response.status_code = 403
            return response


class LoginAPI(ObtainAuthToken):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)

            response = Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
            response.status_code = 200
            return response
        else:
            response = Response({
                'errors': serializer.errors
            })
            response.status_code = 404
            return response


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
