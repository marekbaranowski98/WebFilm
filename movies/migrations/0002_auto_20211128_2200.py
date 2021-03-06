# Generated by Django 3.2.6 on 2021-11-28 22:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='cast',
            field=models.ManyToManyField(related_name='FK_cast_movie', through='movies.Cast', to='movies.Person'),
        ),
        migrations.AddField(
            model_name='movie',
            name='crew',
            field=models.ManyToManyField(related_name='FK_crew', through='movies.Crew', to='movies.Person'),
        ),
        migrations.AlterField(
            model_name='cast',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='FK_cast_movie', to='movies.movie'),
        ),
        migrations.AlterField(
            model_name='crew',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='FK_movie', to='movies.movie'),
        ),
    ]
