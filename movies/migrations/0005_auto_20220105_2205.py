# Generated by Django 3.2.6 on 2022-01-05 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_alter_movie_homepage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='average_vote',
            field=models.FloatField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='count_vote',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
