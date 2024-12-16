from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class IDMapping(models.Model):
    uid = models.UUIDField(primary_key=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    local_id = models.CharField(max_length=255)
    content_object = GenericForeignKey('content_type', 'local_id')

    class Meta:
        unique_together = ['content_type', 'local_id']


class ImportedFile(models.Model):
    file = models.FileField()
    source_url = models.URLField(max_length=1000)
    hash = models.CharField(max_length=40)
    size = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


def get_base_model(model):
    """
    For the given model, return the highest concrete model in the inheritance tree -
    e.g. for BlogPage, return Page
    """
    if model._meta.parents:
        return_model = model._meta.get_parent_list()[0]
        if  return_model.__name__ == 'BasePage':
            return_model = model._meta.get_parent_list()[1]
    else:
        return_model = model
    return return_model


def get_model_mapping_config():
    """
    Get the model mapping configuration from the settings, or return an empty dict

    The model mapping configuration is a dictionary that maps model paths to other model paths.
    This allows to export a model and import it as a different model.

    Example: {'app_name.model_name': 'another_app_name.another_model_name'}
    """
    model_mapping = getattr(settings, "WAGTAILTRANSFER_MODEL_MAPPING", {})
    return model_mapping


def map_model(model_path):
    """
    Map a model path to another model path using the model mapping configuration

    If the model path is not in the mapping configuration, return the original model path
    (e.g. for 'app_name.model_name', return 'another_app_name.another_model_name')
    """
    model_mapping = get_model_mapping_config()
    return model_mapping.get(model_path, model_path)


def get_model_for_path(model_path):
    """
    Given an 'app_name.model_name' string, return the model class

    This function also supports mapping the model to another model using the model mapping configuration
    """
    model_path = map_model(model_path)
    app_label, model_name = model_path.split('.')
    return ContentType.objects.get_by_natural_key(app_label, model_name).model_class()


def get_base_model_for_path(model_path):
    """
    Given an 'app_name.model_name' string, return the Model class for the base model
    (e.g. for 'blog.blog_page', return Page)
    """
    return get_base_model(get_model_for_path(model_path))
