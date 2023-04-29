from django.db import models

# Create your models here.

class Alternative_table(models.Model):
    # id = models.CharField(max_length = 50, primary_key=True) 
    
    tableNumber = models.CharField(max_length=50)
    fieldChoice = models.CharField(max_length=50, null=True)
    alternativeChoice = models.IntegerField()
    rating  = models.IntegerField()
    
    # def __str__(self):
    #     return self.name

class Criteria_table(models.Model):
    fieldChoice = models.CharField(max_length=50)
    alternativeChoice = models.CharField(max_length=50)
    rating = models.IntegerField()    

class Alternative_Eigen(models.Model):
        tableNumber = models.IntegerField()
        fieldName = models.CharField(max_length=30)
        fieldChoice = models.IntegerField()
        notknown= models.IntegerField(null=True)
        value = models.DecimalField(max_digits=6, decimal_places=6)


class Criteria_Table_Eigen(models.Model):
     fieldName = models.CharField(max_length=30)
     fieldChoice = models.IntegerField()
     value = models.DecimalField(max_digits=6, decimal_places=6)
     notknown= models.IntegerField(null=True)