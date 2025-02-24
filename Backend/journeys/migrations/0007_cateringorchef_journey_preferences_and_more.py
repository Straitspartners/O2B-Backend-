# Generated by Django 5.1.4 on 2024-12-14 05:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("journeys", "0006_alter_vendor_vendor_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="cateringorchef",
            name="journey_preferences",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="journeys.journeypreferences",
            ),
        ),
        migrations.AddField(
            model_name="foodpreferences",
            name="journey_preferences",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="journeys.journeypreferences",
            ),
        ),
        migrations.AddField(
            model_name="vendor",
            name="journey_preferences",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="journeys.journeypreferences",
            ),
        ),
    ]
