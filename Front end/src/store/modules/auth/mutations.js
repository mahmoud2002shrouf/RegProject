export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.is_superuser = payload.is_superuser;

  },
  
};