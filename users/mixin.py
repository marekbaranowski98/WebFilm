from rest_framework.views import APIView

from .permissions import OnlyAnonymousUserPermission, OnlyAnonymousUserException


class OnlyAnonymousUserMixin(APIView):
    def check_permissions(self, request):
        super().check_permissions(request)
        if not OnlyAnonymousUserPermission().has_permission(request, self):
            raise OnlyAnonymousUserException()
