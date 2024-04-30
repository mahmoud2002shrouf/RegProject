# serializers.py
from rest_framework import serializers
from .models import CourseSchedule, Course
from .models import Course, Prerequisite,Student

class CourseScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseSchedule
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    prerequisites = serializers.PrimaryKeyRelatedField(many=True, queryset=Course.objects.all(), required=False)

    class Meta:
        model = Course
        fields = '__all__'

    def create(self, validated_data):
        prerequisites_data = validated_data.pop('prerequisites', [])
        course = Course.objects.create(**validated_data)
        course.prerequisites.set(prerequisites_data) 
        return course

class RegisterSerializer(serializers.Serializer):
    class Meta:
        model = Student
        fields = ['id','password','email','name']

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authtoken.views import ObtainAuthToken

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError("User account is disabled.")
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

        return data
