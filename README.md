### README (English)

# Student Course Registration Web Application

## Overview
This web application, built using **Vue.js**, **REST API**, and **Django**, allows students to register for training courses. The system supports two types of users: **Admin** and **Student**. Admins can manage the courses, create rules, set new course schedules, and send notifications to students. Students can search for available courses, register, and create their personal course schedule while ensuring no timing conflicts between their selected courses.

## Features

### Admin Features
- **Browse All Courses**: Admins can view all available courses, including details and enrolled students.
- **Add Rules**: Admins can set rules or prerequisites for specific courses to ensure students meet the required conditions.
- **Create New Courses**: Admins can add new courses to the platform, providing details like course name, description, duration, and schedule.
- **Send Notifications**: Admins can send announcements and notifications to students regarding course updates, schedules, or important information.
- **Schedule New Course Dates**: Admins can create and manage course schedules, ensuring no conflicts arise between different course timings.

### Student Features
- **Register for Courses**: Students can browse available courses and register for the ones that fit their interests and goals.
- **Search for Courses**: Students can search for courses based on keywords, subjects, or dates, making it easier to find suitable courses.
- **Create Personal Study Schedule**: Students can organize their selected courses into a personal schedule that prevents any overlap between course times.
- **Notifications**: Students receive notifications from admins regarding important updates or changes to their courses.

## Technologies Used
- **Frontend**: Vue.js is used for building a responsive and dynamic user interface.
- **Backend**: Django is used to handle server-side logic, authentication, and course management functionalities.
- **API**: A RESTful API is implemented for communication between the frontend and backend, ensuring smooth data exchange.

## How It Works
1. **Admin Login**: Admins can log in to the system, view all available courses, create new ones, and manage existing ones.
2. **Student Login**: Students can register and log in to their accounts, where they can search for courses and add them to their schedule.
3. **Course Registration**: Students can enroll in courses, and the system will automatically check for schedule conflicts to prevent overlaps.
4. **Notifications**: Both admins and students will receive relevant notifications regarding course updates and other important information.

---

### README (Arabic)

# تطبيق ويب لتسجيل الطلاب في الدورات التدريبية

## نظرة عامة
تم بناء هذا التطبيق باستخدام **Vue.js** و **REST API** و **Django**، ويتيح للطلاب التسجيل في الدورات التدريبية. يدعم النظام نوعين من المستخدمين: **المسؤول (Admin)** و **الطالب**. يمكن للمسؤولين إدارة الدورات، إنشاء قواعد وشروط، إضافة مواعيد جديدة للدورات، وإرسال الإشعارات للطلاب. أما الطلاب فيمكنهم البحث عن الدورات المتاحة، التسجيل فيها، وتنظيم جدول دراستهم الشخصي مع التأكد من عدم تداخل مواعيد الدورات مع بعضها.

## الميزات

### ميزات المسؤول (Admin)
- **تصفح جميع الدورات**: يمكن للمسؤولين عرض جميع الدورات المتاحة، بما في ذلك التفاصيل والطلاب المسجلين.
- **إضافة قواعد**: يمكن للمسؤولين تعيين قواعد أو متطلبات مسبقة لبعض الدورات لضمان استيفاء الطلاب للشروط اللازمة.
- **إنشاء دورات جديدة**: يمكن للمسؤولين إضافة دورات جديدة إلى المنصة، وتقديم تفاصيل مثل اسم الدورة، الوصف، المدة، والمواعيد.
- **إرسال الإشعارات**: يمكن للمسؤولين إرسال الإعلانات والإشعارات للطلاب بخصوص تحديثات الدورات أو جداول المواعيد أو المعلومات المهمة.
- **طرح مواعيد جديدة للدورات**: يمكن للمسؤولين إنشاء وإدارة جداول مواعيد الدورات، وضمان عدم وجود تداخل في المواعيد بين الدورات المختلفة.

### ميزات الطلاب
- **التسجيل في الدورات**: يمكن للطلاب تصفح الدورات المتاحة والتسجيل في الدورات التي تناسب اهتماماتهم وأهدافهم.
- **البحث عن الدورات**: يمكن للطلاب البحث عن الدورات باستخدام كلمات مفتاحية، أو الموضوعات، أو المواعيد لتسهيل العثور على الدورات المناسبة.
- **إنشاء جدول دراسي شخصي**: يمكن للطلاب تنظيم الدورات التي قاموا بتسجيلها في جدول دراسي شخصي يمنع أي تداخل في مواعيد الدورات.
- **الإشعارات**: يتلقى الطلاب إشعارات من المسؤولين بخصوص التحديثات المهمة أو التغييرات في الدورات.

## التقنيات المستخدمة
- **الواجهة الأمامية (Frontend)**: تم استخدام Vue.js لبناء واجهة مستخدم ديناميكية ومتجاوبة.
- **الواجهة الخلفية (Backend)**: تم استخدام Django لمعالجة منطق الخادم، المصادقة، ووظائف إدارة الدورات.
- **API**: تم تنفيذ واجهة برمجة تطبيقات RESTful للتواصل بين الواجهة الأمامية والخلفية، مما يضمن تبادل سلس للبيانات.

## كيفية عمل التطبيق
1. **تسجيل دخول المسؤول**: يمكن للمسؤولين تسجيل الدخول إلى النظام، عرض جميع الدورات المتاحة، إنشاء دورات جديدة، وإدارة الدورات الحالية.
2. **تسجيل دخول الطالب**: يمكن للطلاب التسجيل وتسجيل الدخول إلى حساباتهم، حيث يمكنهم البحث عن الدورات وإضافتها إلى جدولهم.
