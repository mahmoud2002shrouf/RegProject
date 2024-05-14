# serializers.py
from rest_framework import serializers
from .models import CourseSchedule, Course,Student
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Securely set the password
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create a Student associated with this user
        Student.objects.create(user=user)

        return user

        


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
        
        print(data)
        return data

