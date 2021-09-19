from rest_framework import permissions


class LoginUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.active_status == 1:
            return True
