from collections import OrderedDict
from django.contrib.auth import authenticate, password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import User


class UserSerializer(serializers.ModelSerializer):
    gen = serializers.CharField(source='get_gender_display')

    class Meta:
        model = User
        fields = ('id', 'login', 'email', 'name', 'surname', 'gen', 'avatar')


class RegisterSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(allow_blank=False, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'login', 'email', 'password', 'repeat_password', 'name', 'surname', 'gender', 'birth_date')
        extra_kwargs = {'password': {'write_only': True}, 'login': {'required': True},}

    def create(self, validated_data: dict):
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
        password = data.get('password')
        if password:
            try:
                password_validation.validate_password(
                    password,
                    user=User(
                        login=data.get('login'),
                        email=data.get('email'),
                        name=data.get('name'),
                        surname=data.get('surname')
                    )
                )
            except Exception as e:
                raise ValidationError({'password': str.split(str(e)[2:-2], "', '")})

        confirm_password = data.pop('repeat_password')
        if password != confirm_password:
            raise ValidationError({'password': 'Hasła muszą być identyczne'})
        return data


class LoginUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ('email', 'password')

    def validate(self, data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("Błędny login lub hasło")
        return user
