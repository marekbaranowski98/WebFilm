import logging
from rest_framework.authtoken.models import Token
from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import RegisterSerializer, LoginFormUserSerializer, LoginUserDataSerializer
from .models import User

loggerUser = logging.getLogger(__name__)


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Return api register

        :param request Request
        :param args:
        :param kwargs:
        :return: Response
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            data = RegisterSerializer(user).data
            loggerUser.info(f'User {data} register')
            response = Response({
                'info': 'Użytkownik został pomyślne zarejestrowany.',
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
    serializer_class = LoginFormUserSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Return api login

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        serializer = self.serializer_class(data=request.data, context={'request': request})

        if serializer.is_valid():
            user = serializer.validated_data
            loggerUser.info(f"User {r'{'}'id': '{user.id}', 'email': '{user}'{r'}'} logged")
            token, created = Token.objects.get_or_create(user=user)
            response = Response({
                'token': token.key,
            })
            response.set_cookie('token', token.key, samesite='strict', path='/')
            response.status_code = 200
            return response
        else:
            if request.POST.get('email'):
                loggerUser.info(f'Attempting to log in to the user  email {request.data["email"]}')
            response = Response({
                'errors': serializer.errors
            })
            response.status_code = 404
            return response


class CheckLoginUserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = LoginUserDataSerializer

    def get_object(self) -> User:
        """
        Return user object

        :return User
        """
        loggerUser.info(f"User {r'{'}'id': '{self.request.user.id}', 'email': '{self.request.user}'{r'}'} connect")
        return self.request.user
