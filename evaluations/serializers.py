from rest_framework import serializers

from users.models import User
from movies.models import Movie
from .models import Rating


class RatingUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault()
    )
    movie = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Movie.objects.all()
    )

    class Meta:
        model = Rating
        fields = ('rating', 'user', 'movie', )
        validators = []

    def create(self, validated_data):
        """
        Create or update rating user for movie

        :param validated_data:
        :return:
        """
        rating = None
        try:
            rating = Rating.objects.get(movie=validated_data['movie'], user=validated_data['user'])
            rating.rating = validated_data['rating']
        except Rating.DoesNotExist:
            rating = Rating.objects.create(
                movie=validated_data['movie'],
                user=validated_data['user'],
                rating=validated_data['rating']
            )
        finally:
            rating.save()

        return rating


class DeleteRatingUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault()
    )
    movie = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Movie.objects.all()
    )

    class Meta:
        model = Rating
        fields = ('user', 'movie', )
        validators = []
