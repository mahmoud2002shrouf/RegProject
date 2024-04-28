<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Courses</router-link>
      </h1>
      <div class="search-container">
        <input type="search" class="search-input" placeholder="Search..." />
        <magnify-icon class="search-icon" />
      </div>

      <ul>
        <li>
          <router-link to="/courses">All Cource</router-link>
        </li>
         <li>
          <router-link to="/schedule">schedule</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/MyCource">My Cource</router-link>
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
  components: { MagnifyIcon },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/courses');
    },
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
  width: 24px; /* Adjust the size of the icon if needed */
  height: 24px;
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