from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, login, email, password, name, surname, gender, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(
            login=login,
            email=email,
            name=name,
            surname=surname,
            gender=gender,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user
