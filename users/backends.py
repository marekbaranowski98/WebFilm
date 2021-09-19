from django.contrib.auth.backends import ModelBackend


class UserBackend(ModelBackend):
    def user_can_authenticate(self, user):
        is_active = getattr(user, 'active_status', None)
        return is_active == 1
