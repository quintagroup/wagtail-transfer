# Generated by Django 3.0.5 on 2020-10-02 08:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0014_rich_text_nullable'),
    ]

    operations = [
        migrations.CreateModel(
            name='LongAdvert',
            fields=[
                ('advert_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tests.Advert')),
                ('description', models.TextField()),
            ],
            bases=('tests.advert',),
        ),
    ]