from django.contrib import admin
from django.conf import settings
from django.urls import path,include
from django.conf.urls.static import static
from ufas import views
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home),
    path('userprofile/',views.userprofile),
    path('attendance/',views.attendance),
    path('allowattendance/',views.allowattendance),
    path('reports/',views.reports),
    path('staffreports/',views.staffreports),
    path('about/',views.about),
    path('start/',views.start),
    path('userlogin/signup',views.signup),
    path('userlogin/',include('django.contrib.auth.urls')),
    # path('foodrequest/',include("requests.urls")),
    # path('foodshare/',include("foodshare.urls")),
    # path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('imgdata/favicon.ico')))
]