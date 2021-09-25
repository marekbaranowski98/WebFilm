from datetime import timedelta

from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

from users.managers import UserManager


def default_avatar() -> str:
    return '00000000-0000-0000-0000-000000000000'


class RolesUser(models.Model):
    order = models.IntegerField(unique=True,)
    role_name = models.CharField(max_length=20, unique=True, blank=False,)

    class Meta:
        db_table = 'users_roles_user'


class User(AbstractBaseUser):
    username = None
    login = models.CharField(
        max_length=30,
        unique=True,
        null=True,
        validators=[
            RegexValidator(
                regex='^.{6,30}$',
                code='error_login',
                message='Login powinien mieć od 6 do 30 znaków.'
            ),
            RegexValidator(
                regex='^[\w.-]+$',
                code='error_login',
                message='Login może się składać tylko ze znaków alfanumerycznych.'
            ),
        ],
    )
    email = models.EmailField(unique=True,)
    name = models.CharField(max_length=150, blank=True, default='',)
    surname = models.CharField(max_length=150, blank=True, default='',)
    GENDER_CHOICES = (
        (0, 'Nieokreślona'),
        (1, 'Kobieta'),
        (2, 'Mężczyzna'),
    )
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0,)
    birth_date = models.DateField(null=True, auto_now_add=False,)
    avatarURL = models.CharField(
        max_length=36,
        default=default_avatar,
        validators=[
            RegexValidator(
                regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}',
                code='error_avatar',
            ),
        ],
    )
    ACTIVE_CHOICES = (
        (0, 'Niekatywne'),
        (1, 'Aktywne'),
        (2, 'Dane uczące'),
        (3, 'Zbanowane'),
    )
    active_status = models.IntegerField(choices=ACTIVE_CHOICES, default=0)
    active_code = models.CharField(
        max_length=36,
        unique=True,
        null=True,
        default=None,
        validators=[
            RegexValidator(
                regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}',
                code='error_active',
            ),
        ],
    )
    role = models.ForeignKey(to=RolesUser, default=1, on_delete=models.RESTRICT, )
    date_joined = models.DateTimeField(default=timezone.now,)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return {
            'login': self.login,
            'email': self.email,
            'name': self.name,
            'surname': self.surname,
            'gender': self.gender,
            'birth_date': self.birth_date.strftime('%Y-%m-%d'),
            'avatarURL': self.avatarURL,
        }.__str__()


class PasswordReset(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, )
    reset_code = models.CharField(
        max_length=36,
        unique=True,
        null=True,
        default=None,
        validators=[
            RegexValidator(
                regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}',
                code='error_reset',
            ),
        ],
    )
    expiration_date = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'users_password_reset'
