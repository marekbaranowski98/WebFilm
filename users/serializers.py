from collections import OrderedDict
from django.contrib.auth import authenticate, password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(allow_blank=False, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'login', 'email', 'password', 'repeat_password', 'name', 'surname', 'gender', 'birth_date')
        extra_kwargs = {'password': {'write_only': True}, 'login': {'required': True},}

    def create(self, validated_data: dict):
        """
        Create new user

        :param validated_data dict
        :return:
        """
        user = User.objects.create_user(
            validated_data.get('login'),
            validated_data.get('email'),
            validated_data.get('password'),
            validated_data.get('name', ''),
            validated_data.get('surname', ''),
            validated_data.get('gender', 0),
        )
        return user

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
        fields = ('id', 'login', 'name', 'avatar')


class UserSerializer(serializers.ModelSerializer):
    gen = serializers.CharField(source='get_gender_display')

    class Meta:
        model = User
        fields = ('id', 'login', 'email', 'name', 'surname', 'gen', 'avatar')
