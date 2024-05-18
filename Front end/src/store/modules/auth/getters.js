export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    console.log("tok",!!state.token)
    // console.log("what the fuckk",!!state.is_superuser)
    return !!state.token
  },
  issuber(state) {
  
    
    return (state.is_superuser===true)
  },

};