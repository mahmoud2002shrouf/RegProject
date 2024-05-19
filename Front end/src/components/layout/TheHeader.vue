<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
  <header>
    <nav>
      <h1>
        <router-link to="/">Courses</router-link>
      </h1>
      <div class="search-container">
        <input
          type="search"
          class="search-input"
          placeholder="Search..."
          v-model.trim="serachContent"
          @keyup.enter="search"
        />
        <MagnifyIcon class="search-icon" @click="search" />
      </div>

      <ul>
        <li>
          <router-link to="/courses">All Cource</router-link>
        </li>
        <li>
          <router-link to="/schedule" v-if="isSuper">schedule</router-link>
        </li>
        <div class="notification-container" v-show="!!isLoggedIn">
          <button @click="toggleNotifications" class="bell-button">🔔</button>

          <transition name="fade">
            <div v-show="showNotifications" class="notification-list">
              <div
                v-for="notification in notifications"
                :key="notification"
                class="notification"
              >
                {{ notification }}
              </div>
              <div v-if="notifications.length === 0">
                <p>You not have any notification</p>
              </div>
            </div>
          </transition>
        </div>

        <li v-if="isLoggedIn">
          <router-link to="/MyCource" v-if="!isSuper">My Cource</router-link>
        </li>

        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

export default {
  data() {
    return {
      serachContent: null,
      showNotifications: false,
      notifications: [],
      isLoading: false,
      error: null,
    };
  },
  components: { MagnifyIcon },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isSuper() {
      return this.$store.getters.issuber;
    },
  },
  methods: {
    async logout() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('logout');
        this.$router.replace('/courses');
      } catch (err) {
        this.error = err.message;
      }
      setTimeout(() => {
                this.$router.replace('/auth');

        this.isLoading = false;
      }, 300);
    },
    search() {
      if (this.serachContent !== null) {
        this.$store.dispatch('course/search', {
          searchContent: this.serachContent,
        });
        this.$router.replace('/search');
      } else {
        console.log('cc');
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    async getAllNot() {
      const res = await fetch('http://localhost:8000/api/recent_courses/', {
        method: 'GET',
      });
      const responseData = await res.json();
      // const notif = [];

      for (const key in responseData) {
        const not = responseData[key];
        console.log(responseData[key]);
        this.notifications.unshift(not);
      }
      console.log(this.notifications);
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.getAllNot();
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 400px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.search-icon {
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.icon {
  position: absolute;
  right: 10px;
}
.notification-container {
  position: relative;
  display: inline-block;
}

.bell-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: relative;
}

.notification-list {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 1000;
}

.notification {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.notification:hover {
  background-color: #ccc;
  border: 1px solid white;
}

.notification:last-child {
  border-bottom: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>