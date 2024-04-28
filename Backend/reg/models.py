from django.db import models
from django.contrib.auth.models import AbstractUser

class Student(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="student_set",
        related_query_name="student",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="student_set",
        related_query_name="student",
    )


class Course(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    prerequisites = models.ManyToManyField(
        'self',
        through='Prerequisite',
        symmetrical=False,
        related_name='course_prerequisites',
        blank=True
    )

    instructor = models.CharField(max_length=100)
    capacity = models.IntegerField()
    scheduleId = models.ForeignKey('CourseSchedule', on_delete=models.CASCADE)

class Prerequisite(models.Model):
    course = models.ForeignKey('Course', related_name='required_for', on_delete=models.CASCADE)
    prerequisite = models.ForeignKey('Course', related_name='prerequisites_for', on_delete=models.CASCADE)

class CourseSchedule(models.Model):
    days = models.CharField(max_length=50)
    startTime = models.TimeField()
    endTime = models.TimeField()
    roomNo = models.CharField(max_length=10)

class StudentRegistration(models.Model):
    studentId = models.ForeignKey('Student', on_delete=models.CASCADE)
    courseId = models.ForeignKey('Course', on_delete=models.CASCADE)
