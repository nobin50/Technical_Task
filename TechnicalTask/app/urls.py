from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/v1/contact/$', views.ContactView.as_view()),
    url(r'^api/v1/contact/(?P<pk>[0-9]+)/$', views.ContactDetailView.as_view())
]