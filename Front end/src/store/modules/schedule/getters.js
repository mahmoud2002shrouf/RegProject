export default {
  schedules(state) {
    return state.schedules;
  },
  hasSchedule(_, getters) {
    return getters.schedules && getters.schedules.length > 0;
  }
};