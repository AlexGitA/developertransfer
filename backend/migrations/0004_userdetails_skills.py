# Generated by Django 5.1.5 on 2025-02-11 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_room_skill_delete_testclass_remove_userdetails_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='skills',
            field=models.ManyToManyField(blank=True, help_text="User's technical skills", to='backend.skill'),
        ),
    ]
