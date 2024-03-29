import datetime
import logging

from collections import OrderedDict

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
from django.db import transaction
from django.contrib.auth import authenticate, password_validation
from django.core.files.uploadedfile import TemporaryUploadedFile
from django.template import loader
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from drf_recaptcha import fields

from WebFilm import settings, helpers
from .models import User, PasswordReset
from .email import Email
from photos.Files import FileManager
from WebFilm.helpers import default_uuid

loggerDebug = logging.getLogger('debug')


class RecaptchaV3Serializer(serializers.Serializer):
    recaptcha = fields.ReCaptchaV3Field(
        action='recaptcha',
    )

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class RegisterSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(allow_blank=False, write_only=True)
    accept_statute = serializers.BooleanField(required=True)
    avatar = serializers.ImageField(required=False)
    recaptcha = serializers.CharField()

    class Meta:
        model = User
        fields = (
            'id', 'login', 'email', 'password', 'repeat_password', 'name', 'surname', 'gender', 'birth_date',
            'avatar', 'accept_statute', 'recaptcha',
        )
        extra_kwargs = {
            'password': {'write_only': True, },
            'login': {'required': True, },
            'email': {'required': True, },
            'birth_date': {'required': True, },
        }

    @transaction.atomic
    def create(self, validated_data: dict):
        """
        Create new user

        :param validated_data dict
        :return:
        """
        try:
            file_url = default_uuid()
            if validated_data.get('avatar'):
                file = FileManager()
                file_url = helpers.generate_uuid()
                file.upload_file('users', validated_data['avatar'], file_url)

            user = User.objects.create_user(
                validated_data.get('login'),
                validated_data.get('email'),
                validated_data.get('password'),
                validated_data.get('name', ''),
                validated_data.get('surname', ''),
                validated_data.get('birth_date'),
                validated_data.get('gender', 0),
                file_url,
                helpers.generate_uuid(),
            )

            html_message = loader.render_to_string('active_user.html', {
                'user': user,
            })

            email = Email('Aktywacja konta - WebFilm', [f'{user.name} {user.surname} <{user.email}>'],
                          self.__build_text_message(user), html_message)
            email.send_email()
            return user
        except Exception as e:
            loggerDebug.debug(e)

    def update(self, instance: User, validated_data: OrderedDict):
        """
        Update User

        :param instance User
        :param validated_data OrderedDict
        :return User
        """
        if validated_data.get('password'):
            instance.password = make_password(validated_data.get('password'))
        instance.save()
        return instance

    def validate(self, data: OrderedDict):
        """
        Check data

        :param data OrderedDict
        :return OrderedDict
        :except ValidationError
        """
        password = data.get('password')
        confirm_password = data.get('repeat_password')

        if password and confirm_password:
            if password != confirm_password:
                raise ValidationError({'password': 'Hasła muszą być identyczne'}, code='different-password')
            try:
                password_validation.validate_password(
                    password,
                    user=User(
                        login=data.get('login'),
                        email=data.get('email'),
                        name=data.get('name'),
                        surname=data.get('surname'),
                    )
                )
            except Exception as e:
                raise ValidationError({'password': str.split(str(e)[2:-2], "', '")}, code='error-password')
        elif password:
            raise ValidationError({'repeat_password': 'To pole jest wymagane.'})
        elif confirm_password:
            raise ValidationError({'password': 'To pole jest wymagane.'})

        if data.get('recaptcha'):
            validate_recaptcha(data.get('recaptcha'), self.context)
        else:
            raise ValidationError({'recaptcha': 'To pole jest wymagane.'})
        return data

    def validate_birth_date(self, value: datetime.date):
        """
        Check birth date

        :param value datetime.date
        :return datetime.date
        """
        if value:
            today = datetime.date.today()
            min_age = today - datetime.date(year=today.year - 13, month=today.month, day=today.day)
            if value > today - min_age:
                raise ValidationError(['Aby założyć konto należy mieć min 13 lat.'], code='birth-date')
            return value
        else:
            raise ValidationError(['To pole jest wymagane.'], code='birth-date')

    def validate_avatar_file(self, file: TemporaryUploadedFile):
        """
        Check avatar

        :param file TemporaryUploadedFile
        :return TemporaryUploadedFile
        """
        limit_size_file = settings.MAX_FILE_SIZE_MB * 1024 ** 2
        if file.size > limit_size_file:
            raise ValidationError({'avatar': f'Maksymalny  rozmiar pliku to {limit_size_file} MB'})
        return file

    def validate_accept_statute(self, value: bool):
        """
        Check accept statute

        :param value bool
        :return value bool
        """
        if not value:
            raise ValidationError({'accept_statute': 'Akceptacja regulaminu jest obowiązkowa.'}, code='accept-statute')
        return value

    def validate_recaptcha(self, value: str):
        """
        Check recaptcha

        :param value str
        :return value str
        """
        return validate_recaptcha(value, self.context)

    def __build_text_message(self, user: User) -> str:
        return f'Witaj {user.name}!\nDziękujemy za założenie konta w naszym serwisie. Konto zostało utworzone, ' \
               f'ale wymaga aktywacji. Do aktywacji konta należy wejść na stronę:\n' \
               f'http://127.0.0.1:8000/active-user/{user.active_code}/. Następnie należy się zalogować.\n' \
               f'Ta wiadomość została wygenerowana przez system, nie odpowiadaj na nią.\n\n' \
               f'Pozdrawiamy,\nWebFilm'


def validate_recaptcha(token, context):
    captcha = RecaptchaV3Serializer(data=OrderedDict({'recaptcha': token}), context=context)
    if not captcha.is_valid():
        raise ValidationError('Wykryliśmy, że jesteś botem.', code='recaptcha')
    return token


class LoginFormUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    remember_me = serializers.BooleanField(required=False, default=False)
    recaptcha = serializers.CharField()

    class Meta:
        model = User
        fields = ('email', 'password', 'remember_me', 'recaptcha',)

    def validate(self, data: OrderedDict):
        """
        Check data

        :param data OrderedDict
        :return OrderedDict
        :except ValidationError
        """
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("Błędny login lub hasło", code='error-login')
        return user

    def validate_recaptcha(self, value: str):
        """
        Check recaptcha

        :param value str
        :return value str
        """
        return validate_recaptcha(value, self.context)


class LoginUserDataSerializer(serializers.ModelSerializer):
    role = serializers.ReadOnlyField(source='role.order')

    class Meta:
        model = User
        fields = ('id', 'login', 'email', 'name', 'surname', 'gender', 'birth_date', 'avatar_url', 'role')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'login', 'name', 'surname', 'avatar_url',)


class RequestResetPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    user = serializers.IntegerField(required=False, allow_null=True, read_only=True)
    recaptcha = serializers.CharField()

    class Meta:
        model = PasswordReset
        fields = ('email', 'user', 'recaptcha',)

    def validate(self, data: OrderedDict):
        """
        Check email from data

        :param data OrderedDict
        :return OrderedDict
        """
        try:
            u = User.objects.get(email=data.get('email'))
            if u.active_status == 1:
                return data
            raise ValidationError('Konto jest nieaktywne.')
        except User.DoesNotExist:
            raise ValidationError('Nie ma użytkownika o takim adresie.')
        except ValidationError as v:
            raise v

    def validate_recaptcha(self, value: str):
        """
        Check recaptcha

        :param value str
        :return value str
        """
        return validate_recaptcha(value, self.context)

    @transaction.atomic
    def create(self, validated_data: dict):
        """
        Create new reset password

        :param validated_data dict
        :return:
        """
        try:
            user = User.objects.get(email=validated_data.get('email'))
            reset = PasswordReset.objects.create(
                user=user,
                expiration_date=datetime.datetime.now() + datetime.timedelta(hours=1),
                reset_code=helpers.generate_uuid(),
            )
            reset.save()

            html_message = loader.render_to_string('reset_password.html', {
                'reset_password': reset,
            })
            email = Email('Reset hasła - WebFilm', [f'{user.name} {user.surname} <{user.email}>'],
                          self.__build_text_message(reset), html_message)
            email.send_email()

            return reset
        except Exception as e:
            loggerDebug.debug(e)

    def __build_text_message(self, reset_password: PasswordReset):
        return f'Witaj {reset_password.user.name}!\nOtrzymaliśmy żądania resetu hasła. Jeżeli to nie ty proszę, ' \
               f'zignoruj tę wiadomość.\nDo resetu hasła należy wejść na stronę:\n' \
               f'http://127.0.0.1:8000/reset-password/{reset_password.reset_code}/.\n' \
               f'Po zmianie hasła będzie można zalogować się.\nLink jest ważny przez godzinę.\n' \
               f'Ta wiadomość została wygenerowana przez system, nie odpowiadaj na nią.\n\n' \
               f'Pozdrawiamy,\nWebFilm'


class UserEditSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(allow_blank=False, write_only=True)
    repeat_password = serializers.CharField(allow_blank=False, write_only=True)
    accept_statute = serializers.BooleanField(required=False)
    avatar = serializers.ImageField(required=False)
    recaptcha = serializers.CharField(required=False)

    class Meta(RegisterSerializer.Meta):
        fields = RegisterSerializer.Meta.fields + (
            'current_password', 'repeat_password', 'accept_statute', 'avatar', 'recaptcha',
        )

    def update(self, instance: User, validated_data: OrderedDict):
        """
        Update User

        :param instance User
        :param validated_data OrderedDict
        :return User
        """
        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if validated_data.get('password'):
            instance.password = make_password(validated_data.get('password'))
        if validated_data.get('email'):
            instance.email = BaseUserManager.normalize_email(validated_data.get('email'))
        if validated_data.get('avatar'):
            file = FileManager()
            if instance.avatar_url != default_uuid():
                file.delete_file('users', instance.avatar_url)
            url = helpers.generate_uuid()
            file.upload_file('users', validated_data.get('avatar'), url)
            instance.avatar_url = url

        instance.save()
        return instance

    def validate(self, data: OrderedDict):
        """
        Check data

        :param data OrderedDict
        :return OrderedDict
        """
        if data.get('email') or data.get('login') or data.get('password'):
            if not data.get('current_password'):
                raise ValidationError({'current_password': ['To pole jest wymagane.']})
        return data

    def validate_current_password(self, value: str):
        """
        User authorization by password

        :param value str
        :return str
        """
        if not check_password(value, self.instance.password):
            raise ValidationError(['Niepoprawne obecne hasło.'])
        return value


class UserDeleteSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(allow_blank=False)

    class Meta:
        model = User
        fields = ('current_password', )

    def update(self, instance: User, validated_data: OrderedDict):
        """
        Delete User

        :param instance User
        :param validated_data OrderedDict
        :return User
        """
        instance.login = None
        instance.password = ''
        instance.last_login = None
        instance.email = None
        instance.name = ''
        instance.surname = ''
        instance.gender = 0
        instance.birth_date = None
        instance.active_status = 2
        instance.date_joined = None
        instance.active_code = None
        instance.role_id = 1

        if instance.avatar_url != default_uuid():
            file = FileManager()
            file.delete_file('users', instance.avatar_url)
        instance.avatar_url = None

        instance.save()
        return instance

    def validate_current_password(self, value: str):
        """
        User authorization by password

        :param value str
        :return str
        """
        if not check_password(value, self.instance.password):
            raise ValidationError(['Niepoprawne obecne hasło.'])
        return value
