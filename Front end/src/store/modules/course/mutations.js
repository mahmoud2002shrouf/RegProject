export default {
  registerCourse(state, payload) {
    state.courses.push(payload);
  },
  setCourse(state, payload) {
    state.courses = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};