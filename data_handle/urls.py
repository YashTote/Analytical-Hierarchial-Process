from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('alternatives/add/', views.alternative_add),
    path('criteria/add/', views.criteria_add),
    path('alternativeEigen/add/', views.alternative_eigen_add ),
    path('criteriaEigen/add/', views.criteria_eigen_add),
]

urlpatterns = format_suffix_patterns(urlpatterns)