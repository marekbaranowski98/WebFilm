from rest_framework import serializers

from .models import Movie, Genre, Cast, Crew, Person, Keyword, Company, Country, Language, Collection


class ListMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'gallery')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'surname', 'gallery')


class CastSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = Cast
        fields = ('id', 'character', 'person')


class CrewSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = Crew
        fields = ('id', 'job', 'person')


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    collection = CollectionSerializer()
    genres = GenreSerializer(many=True)
    keywords = KeywordSerializer(many=True)
    production_companies = CompanySerializer(many=True)
    production_countries = CountrySerializer(many=True)
    original_language = LanguageSerializer()
    spoken_languages = LanguageSerializer(many=True)

    class Meta:
        model = Movie
        fields = (
            'id',
            'title', 'original_title', 'release_date', 'runtime', 'genres', 'collection', 'homepage', 'overview',
            'tagline', 'cast', 'crew', 'keywords', 'production_companies', 'production_countries', 'original_language',
            'spoken_languages', 'budget', 'revenue', 'average_vote', 'count_vote', 'gallery'
        )
