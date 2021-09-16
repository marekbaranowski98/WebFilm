# Generated by Django 3.2.6 on 2021-09-15 23:08

import django.core.validators
from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20210914_1907'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar',
        ),
        migrations.AddField(
            model_name='user',
            name='avatarURL',
            field=models.CharField(default=users.models.default_avatar, max_length=36, validators=[django.core.validators.RegexValidator(code='error_avatar', regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')]),
        ),
    ]
