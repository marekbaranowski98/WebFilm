from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

from users.managers import UserManager


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
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150, blank=True, default='')
    surname = models.CharField(max_length=150, blank=True, default='')
    GENDER_CHOICES = (
        (0, 'Nieokreślona'),
        (1, 'Kobieta'),
        (2, 'Mężczyzna'),
    )
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0)
    birth_date = models.DateField(null=True, default=None, auto_now_add=False)
    avatar = models.CharField(
        max_length=36,
        default='00000000-0000-0000-0000-000000000000',
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
        (3, 'zbanowane'),
    )
    is_active = models.IntegerField(choices=ACTIVE_CHOICES, default=0)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email