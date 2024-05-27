export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    console.log(payload);
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'http://127.0.0.1:8000/api/login/';

    if (mode === 'signup') {
      url = 'http://127.0.0.1:8000/api/register/';
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        username: payload.username,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    } else {
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      localStorage.setItem('is_superuser', responseData.is_superuser);}
    
    context.commit('setUser', {
      token: responseData.token,
      userId: responseData.userId,
      is_superuser: responseData.is_superuser,
    });
      context.dispatch('course/loadCourses', {
        forceRefresh: true,
      });
    
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const is_superuser =
      localStorage.getItem('is_superuser') === 'true' ? true : false;

    if (!!token && !!userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        is_superuser: is_superuser,
      });
    }
  },
  async logout(context) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:8000/api/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('is_superuser');

    context.commit('setUser', {
      token: null,
      userId: null,
    });
    context.dispatch('course/loadCourses', {
      forceRefresh: true,
    });
  },
};
