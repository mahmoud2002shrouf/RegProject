from django.urls import path
from .views import add_course_schedule, get_all_course_schedules, add_course, get_all_courses
from .import views 
urlpatterns = [
    path('course_schedule/add/', add_course_schedule, name='add_course_schedule'),
    path('course_schedule/all/', get_all_course_schedules, name='get_all_course_schedules'),
    path('course/add/', add_course, name='add_course'),
    path('course/all/', get_all_courses, name='get_all_courses'),
    path('register/',views.Register.as_view(), name='register'),
]
