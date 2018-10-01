
from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length= 75)
    phone = models.IntegerField()
    
    def __str__(self):
        return self.name