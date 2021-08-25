from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User


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
