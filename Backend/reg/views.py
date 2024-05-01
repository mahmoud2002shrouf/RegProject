# views.py
from rest_framework import status
from rest_framework.decorators import APIView,api_view
from rest_framework.response import Response
from .models import CourseSchedule, Course,Student
from .serializers import CourseScheduleSerializer, CourseSerializer,RegisterSerializer
from django.contrib.auth.models import User
@api_view(['POST'])
def add_course_schedule(request):
    serializer = CourseScheduleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_course_schedules(request):
    schedules = CourseSchedule.objects.all()
    serializer = CourseScheduleSerializer(schedules, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_course(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

class Register(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            
            if User.objects.filter(username=request.data['username']).exists():
                return Response({'message': 'User already exists'}, status=400)

            user = User.objects.create_user(username=request.data['username'], email=request.data['email'])
            student = Student.objects.create(user=user)
            
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import LoginSerializer

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response(serializer.errors, status=400)
