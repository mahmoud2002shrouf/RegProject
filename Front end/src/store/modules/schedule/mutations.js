export default {
  addSchedule(state, payload) {
    state.schedules.push(payload);
  },
  fetchschedule(state, payload) {
    state.schedules = payload;
  }
};