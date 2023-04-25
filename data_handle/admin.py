from django.contrib import admin
from .models import Alternative_table, Criteria_table, Alternative_Eigen, Criteria_Table_Eigen
# Register your models here.
admin.site.register(Alternative_table)
admin.site.register(Criteria_table)
admin.site.register(Alternative_Eigen)
admin.site.register(Criteria_Table_Eigen)