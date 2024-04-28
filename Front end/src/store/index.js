import { createStore } from 'vuex';

import coursrModule from './modules/course/index.js';
import scheduleModule from './modules/schedule/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    course: coursrModule,
    schedule: scheduleModule,
    auth: authModule
  }
});

export default store;