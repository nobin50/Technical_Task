from rest_framework import serializers
from . models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            'id',
            'name',
            'phone'
        ]

        model = Contact