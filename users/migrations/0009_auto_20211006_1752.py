# Generated by Django 3.2.6 on 2021-10-06 17:52

import django.core.validators
from django.db import migrations, models
import django.utils.timezone
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_auto_20210925_2319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatarURL',
            field=models.CharField(default='00000000-0000-0000-0000-000000000000', max_length=36, null=True, validators=[django.core.validators.RegexValidator(code='error_avatar', regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')]),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True, unique=True),
        ),
    ]
