from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, login, email, password, name, surname,
                    birth_date, gender, avatar, active_code, **extra_fields):
        """
        Create and save a User with the given email and password.

        :param login str
        :param email str in format email
        :param password str
        :param name Optional[str]
        :param surname Optional[str]
        :param birth_date date
        :param gender Optional[int]
        :param avatar Optional[str]
        :param active_code Optional[str]
        :param extra_fields:
        :return register User
        """
        if not login:
            raise ValueError('Musisz podać login')
        if not email:
            raise ValueError('Musisz podać email')
        if not password:
            raise ValueError('Musisz podać hasło')
        if not birth_date:
            raise ValueError('Musisz podać date urodzenia')
        email = self.normalize_email(email)
        user = self.model(
            login=login,
            email=email,
            name=name,
            surname=surname,
            birth_date=birth_date,
            gender=gender,
            avatar_url=avatar,
            active_code=active_code,
            **extra_fields
        )
        user.set_password(password)
        user.save()

        return user
