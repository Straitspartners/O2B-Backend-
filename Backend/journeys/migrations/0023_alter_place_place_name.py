# Generated by Django 5.1.4 on 2024-12-28 04:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("journeys", "0022_placestovisit_place"),
    ]

    operations = [
        migrations.AlterField(
            model_name="place",
            name="place_name",
            field=models.CharField(
                choices=[
                    ("natural_beauty", "Natural Beauty and Beaches"),
                    ("local_culture", "Local Cultures and Traditions"),
                    ("wellness_relaxation", "Wellness and Relaxation"),
                    ("wedding_pre_wedding", "Wedding and Pre-Wedding"),
                    ("adventures_activities", "Adventures and Activities"),
                    ("local_culinary", "Local Culinary"),
                    ("shopping", "Shopping in Bali"),
                    ("luxury_experiences", "Luxury and Unique Experiences"),
                    ("others", "Others"),
                ],
                max_length=255,
                unique=True,
            ),
        ),
    ]
