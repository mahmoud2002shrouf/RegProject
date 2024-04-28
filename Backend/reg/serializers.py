# serializers.py
from rest_framework import serializers
from .models import CourseSchedule, Course
from .models import Course, Prerequisite

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
