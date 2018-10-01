from django.shortcuts import render
from rest_framework import generics
from . serializers import ContactSerializer
from . models import Contact

class ContactView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


def index(request):
    return render(request, 'base.html')
