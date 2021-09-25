from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions
from rest_framework.exceptions import APIException
from rest_framework.status import HTTP_401_UNAUTHORIZED


class LoginUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.active_status == 1:
            return True


class OnlyAnonymousUserException(APIException):
    status_code = HTTP_401_UNAUTHORIZED
    default_detail = 'Użytkownik jest zalogowany.'


class OnlyAnonymousUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user is None or type(request.user) is not AnonymousUser:
            raise OnlyAnonymousUserException()
        return True
