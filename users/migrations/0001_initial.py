# Generated by Django 3.2.6 on 2021-08-25 09:57

import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('login', models.CharField(max_length=30, null=True, unique=True, validators=[django.core.validators.RegexValidator(code='error_login', message='Login powinien mieć od 6 do 30 znaków.', regex='^.{6,30}$'), django.core.validators.RegexValidator(code='error_login', message='Login może się składać tylko ze znaków alfanumerycznych.', regex='^[\\w.-]+$')])),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(blank=True, default='', max_length=150)),
                ('surname', models.CharField(blank=True, default='', max_length=150)),
                ('gender', models.IntegerField(choices=[(0, 'Nieokreślona'), (1, 'Kobieta'), (2, 'Mężczyzna')], default=0)),
                ('birth_date', models.DateField(default=None, null=True)),
                ('avatar', models.CharField(default='00000000-0000-0000-0000-000000000000', max_length=36, validators=[django.core.validators.RegexValidator(code='error_avatar', regex='[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')])),
                ('is_active', models.IntegerField(choices=[(0, 'Niekatywne'), (1, 'Aktywne'), (2, 'Dane uczące'), (3, 'zbanowane')], default=0)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
