export default {
  addSchedule(state, payload) {
    console.log(payload)
    state.schedules.push(payload);
  },
  fetchschedule(state, payload) {
    state.schedules = payload;
  }
};