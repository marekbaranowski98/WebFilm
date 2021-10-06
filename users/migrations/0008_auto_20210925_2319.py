# Generated by Django 3.2.6 on 2021-09-25 23:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20210925_1954'),
    ]

    operations = [
        migrations.RenameField(
            model_name='passwordreset',
            old_name='user_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='role_id',
            new_name='role',
        ),
        migrations.AlterField(
            model_name='passwordreset',
            name='expiration_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
