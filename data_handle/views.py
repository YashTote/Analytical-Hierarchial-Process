from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from data_handle.models import Alternative_table, Criteria_table, Alternative_Eigen, Criteria_Table_Eigen
from data_handle.serializers import AlternativeSerializer, CriteriaSerializer, AlternativeEigenSerializer, NewCriteriaEigenSerializer

@api_view(['GET', 'POST'])
def alternative_eigen_add(request):
    if request.method == 'GET':
        alternatives = Alternative_Eigen.objects.all()
        serialzer = AlternativeEigenSerializer(alternatives, many = True)
        return Response(serialzer.data)
    elif request.method == 'POST':
        serialzer = AlternativeEigenSerializer(data = request.data)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status = status.HTTP_201_CREATED)
        return Response(serialzer.errors, status  = status.HTTP_400_BAD_REQUEST)

@api_view(['GET' , 'POST'])
def alternative_add(request):
    if request.method == 'GET':
        alternatives = Alternative_table.objects.all()
        serializer = AlternativeSerializer(alternatives, many = True)
        return Response(serializer.data)
    else:
        serializer = AlternativeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def criteria_eigen_add(request):
    if request.method == 'GET':
        criterias = Criteria_Table_Eigen.objects.all()
        serializer = NewCriteriaEigenSerializer(criterias, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = NewCriteriaEigenSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) 

@api_view(['GET', 'POST'])
def criteria_add(request):
    if request.method == 'GET':
        criterias = Criteria_table.objects.all()
        serializer = CriteriaSerializer(criterias, many= True)
        return Response(serializer.data)
    else:
        serializer = CriteriaSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
    

    