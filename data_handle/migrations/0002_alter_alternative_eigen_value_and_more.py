# Generated by Django 4.1.5 on 2023-04-27 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_handle', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alternative_eigen',
            name='value',
            field=models.DecimalField(decimal_places=6, max_digits=6),
        ),
        migrations.AlterField(
            model_name='criteria_table_eigen',
            name='value',
            field=models.DecimalField(decimal_places=6, max_digits=6),
        ),
    ]
