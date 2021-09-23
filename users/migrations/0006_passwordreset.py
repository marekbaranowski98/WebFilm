# Generated by Django 3.2.6 on 2021-09-21 18:49

import datetime
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_active_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reset_code', models.CharField(default=None, max_length=36, null=True, unique=True, validators=[django.core.validators.RegexValidator(code='error_reset', regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')])),
                ('expiration_date', models.DateTimeField(default=datetime.datetime(2021, 9, 21, 19, 49, 6, 495260))),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'users_password_reset',
            },
        ),
    ]