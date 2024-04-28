import { createRouter, createWebHistory } from 'vue-router';

import CourseDetail from './pages/Course/CourseDetail.vue';
import CourseList from './pages/Course/CourseList.vue';
import CourseRegistration from './pages/Course/CourseRegistration.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';
import Scheduling from './components/scheduling/Scheduling.vue'
import MyCourse from './pages/MyCourse/MyCourse.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/courses', component: CourseList },
    {
      path: '/courses/:id',
      component: CourseDetail,
      props: true,
   
    },
    { path: '/register', component: CourseRegistration, meta: { requiresAuth: true } },
    { path: '/schedule', component: Scheduling, meta: { requiresAuth: true } },
    { path: '/MyCource', component: MyCourse, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/courses');
  } else {
    next();
  }
});

export default router;
