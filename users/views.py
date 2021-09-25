import datetime
import logging

from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework import generics, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import RegisterSerializer, LoginFormUserSerializer, LoginUserDataSerializer, \
    RequestResetPasswordSerializer
from .models import User, PasswordReset
from .permissions import LoginUserPermission
from .mixin import OnlyAnonymousUserMixin

loggerUser = logging.getLogger(__name__)
loggerDebug = logging.getLogger('debug')


class RegisterAPI(OnlyAnonymousUserMixin, generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Return api register

        :param request Request
        :param args:
        :param kwargs:
        :return: Response
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()

                loggerUser.info(f'User {user} register')
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
        except Exception as e:
            loggerDebug.debug(e)
            return Response({
                'non_field_errors': 'Coś poszło nie tak',
            }, status=400)


class LoginAPI(ObtainAuthToken, viewsets.ViewSet):
    serializer_class = LoginFormUserSerializer

    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        LogoutPage user

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        Token.objects.get(user=request.user).delete()
        response = Response({})
        response.delete_cookie('token')
        response.status_code = 204
        return response

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
            loggerUser.info(f"User {r'{'}'id': '{user.id}', 'email': '{user.email}'{r'}'} logged")
            token, created = Token.objects.get_or_create(user=user)
            response = Response({
                'token': token.key,
            })

            expires_password = None
            if request.data.get('remember_me'):
                expires_password = datetime.datetime.now() + datetime.timedelta(days=30)

            response.set_cookie('token', token.key, samesite='strict', path='/', expires=expires_password)
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
    permission_classes = [LoginUserPermission]
    serializer_class = LoginUserDataSerializer

    def get_object(self) -> User:
        """
        Return user object

        :return User
        """
        u = User.objects.get(email=self.request.user.email)
        u.last_login = timezone.now()
        u.save()
        loggerUser.info(f"User {r'{'}'id': '{self.request.user.id}', "
                        f"'email': '{self.request.user.email}'{r'}'} connect")
        return self.request.user


class ValidationUserDataAPI(generics.CreateAPIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Return response information validate user data

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        if not ('value' in request.data or 'key' in request.data) or \
                len(User.objects.in_bulk([request.data['value']], field_name=request.data['key'])) == 0:
            return Response(status=204)
        else:
            return Response({
                request.data['key']: f"Istnieje użytkownik z takim {request.data['key']}.",
            }, status=422)


class ActiveUserAPI(OnlyAnonymousUserMixin, generics.RetrieveUpdateAPIView):
    def get(self, request: Request, *args, **kwargs) -> Response:
        """
        Active user

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        key = str(kwargs['key'])
        try:
            u = get_object_or_404(User, active_code=key)
            u.active_status = 1
            u.active_code = None
            u.save()
            loggerUser.info(f'User {u.id} activate account.')
            return Response(status=204)
        except:
            return Response(status=404)


class ResetPasswordAPI(OnlyAnonymousUserMixin, generics.CreateAPIView, generics.UpdateAPIView, viewsets.ViewSet):
    serializer_class = RequestResetPasswordSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Send request reset password to email from data

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        reset_password = self.get_serializer(data=request.data, context={'request': request})
        if reset_password.is_valid():
            reset_password.save()
            loggerUser.info(f"User {reset_password.validated_data.get('email')} generated reset password link")

            return Response(status=200)
        else:
            return Response({'errors': reset_password.errors}, status=404)

    def patch(self, request: Request, *args, **kwargs) -> Response:
        """
        Reset password

        :param request Request
        :param args:
        :param kwargs:
        :return Response
        """
        key = str(kwargs['key'])
        try:
            reset = PasswordReset.objects.get(reset_code=key)

            if reset.expiration_date > datetime.datetime.now():
                user = RegisterSerializer(instance=reset.user, data=request.data, partial=True)
                if user.is_valid():
                    user.save()

                    reset.expiration_date = datetime.datetime.now()
                    reset.reset_code = None
                    reset.save()
                    loggerUser.info(f'User {reset.user.id} reset password')
                    return Response(status=204)
                else:
                    return Response({'errors': user.errors}, status=403)
            else:
                return Response({
                    'non_field_errors': 'Link wygasł.'
                }, status=408)
        except PasswordReset.DoesNotExist:
            return Response({
                'non_field_errors': 'Podano błędny link.'
            }, status=404)
