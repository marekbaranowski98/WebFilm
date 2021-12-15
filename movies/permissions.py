from rest_framework import permissions

from users.models import User
from .models import Movie


class MovieIsVisibility(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: Movie):
        return obj.visibility or (type(request.user) is User and request.user.role.order > 5)
