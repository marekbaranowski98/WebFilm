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
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['login'],
            validated_data['email'],
            validated_data['password'],
            validated_data['name'],
            validated_data['surname'],
            validated_data['gender'],
        )
        return user

    def validate(self, data):
        password = data.get('password')
        if password:
            try:
                password_validation.validate_password(password, self.instance)
            except Exception as e:
                raise ValidationError({'password': str.split(str(e)[2:-2], "', '")})

        confirm_password = data.pop('repeat_password')
        if password != confirm_password:
            raise ValidationError({'password': 'Hasła muszą być identyczne'})
        return data


class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("Błędny login lub hasło")
        return user
