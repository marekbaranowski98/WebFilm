import datetime
import logging

from collections import OrderedDict
from django.db import transaction
from django.contrib.auth import authenticate, password_validation
from django.core.files.uploadedfile import TemporaryUploadedFile
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from WebFilm import settings
from .models import User, default_avatar
from photos.Files import FileManager


loggerDebug = logging.getLogger('debug')


class RegisterSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(allow_blank=False, write_only=True)
    accept_statute = serializers.BooleanField(required=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = (
            'id', 'login', 'email', 'password', 'repeat_password', 'name', 'surname', 'gender', 'birth_date',
            'avatar', 'accept_statute'
        )
        extra_kwargs = {'password': {'write_only': True}, 'login': {'required': True},}

    @transaction.atomic
    def create(self, validated_data: dict):
        """
        Create new user

        :param validated_data dict
        :return:
        """
        try:
            file_url = default_avatar()
            if validated_data.get('avatar'):
                file = FileManager()
                file_url = file.generete_uuid()
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
            )
            return user
        except Exception as e:
            loggerDebug.debug(e)

    def validate(self, data: OrderedDict):
        """
        Check data

        :param data OrderedDict
        :return OrderedDict
        :except ValidationError
        """
        password = data.get('password')
        if password:
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

        confirm_password = data.pop('repeat_password')
        if password != confirm_password:
            raise ValidationError({'password': 'Hasła muszą być identyczne'}, code='different-password')
        return data

    def validate_birth_date(self, value):
        """
        Check birth date

        :param value datetime.date
        :return datetime.date
        """
        if value:
            today = datetime.date.today()
            min_age = today - datetime.date(year=today.year - 13, month=today.month, day=today.day)
            if value > today - min_age:
                raise ValidationError({'birth_date': 'Aby założyć konto należy mieć min 13 lat.'}, code='birth-date')
            return value
        else:
            raise ValidationError({'birth_date': 'To pole jest wymagane.'}, code='birth-date')

    def validate_avatar_file(self, file: TemporaryUploadedFile):
        limit_size_file = settings.MAX_FILE_SIZE_MB * 1024 * 1024
        if file.size > limit_size_file:
            raise ValidationError({'avatar': f'Maksymalny  rozmiar pliku to {limit_size_file} MB'})
        return file

    def validate_accept_statute(self, value):
        """
        Check accept statute

        :param value boolean
        :return value boolean
        """
        if not value:
            raise ValidationError({'accept_statute': 'Akceptacja regulaminu jest obowiązkowa.'}, code='accept-statute')
        return value


class LoginFormUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    remember_me = serializers.BooleanField(required=False, default=False)

    class Meta:
        model = User
        fields = ('email', 'password', 'remember_me',)

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


class LoginUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'login', 'name', 'avatarURL')


class UserSerializer(serializers.ModelSerializer):
    gen = serializers.CharField(source='get_gender_display')

    class Meta:
        model = User
        fields = ('id', 'login', 'email', 'name', 'surname', 'gen', 'avatarURL')
