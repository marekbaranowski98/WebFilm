# Generated by Django 3.2.6 on 2021-09-14 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birth_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_active',
            field=models.IntegerField(choices=[(0, 'Niekatywne'), (1, 'Aktywne'), (2, 'Dane uczące'), (3, 'Zbanowane')], default=0),
        ),
    ]