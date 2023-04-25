from rest_framework import serializers
from data_handle.models import Alternative_table, Criteria_table, Alternative_Eigen, Criteria_Table_Eigen

class AlternativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternative_table
        fields = ['id', 'tableNumber','fieldChoice', 'alternativeChoice', 'rating']

        def __str__(self):
            return self.name
        
class CriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criteria_table
        fields = ['id', 'fieldChoice', 'alternativeChoice', 'rating']

        def __str__(self):
            return self.name
        
class AlternativeEigenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternative_Eigen
        fields = ['id', 'tableNumber', 'fieldName', 'fieldChoice', 'value']

        def __str__(self):
            return self.name

        
class NewCriteriaEigenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criteria_Table_Eigen
        fields = ['id', 'fieldName', 'fieldChoice', 'value']

        def __str__(self):
            return self.name                