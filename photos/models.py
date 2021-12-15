from django.core.validators import RegexValidator
from django.db import models

from WebFilm.helpers import default_uuid


class Gallery(models.Model):
    id = models.IntegerField(primary_key=True, )


class Photo(models.Model):
    url = models.CharField(
        max_length=36,
        default=default_uuid(),
        validators=[
            RegexValidator(
                regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}',
                code='error_photo',
            ),
        ],
    )
    gallery = models.ForeignKey(to=Gallery, on_delete=models.CASCADE, )
    order = models.IntegerField(null=False, default=0, )
