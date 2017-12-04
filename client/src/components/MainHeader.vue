<template>
  <header>
    <div class="head container">
      <h3>
        <router-link to="/">
          <img class="logo" src="../assets/logo.png" alt="logo"/>
          Shrike Videos
        </router-link>
      </h3>
      <nav>
        <div class="col"><router-link to="links">links</router-link></div>
        <div v-if="!loggedIn" class="col"><router-link to="login">login</router-link></div>
        <div v-if="loggedIn" class="col"><router-link to="new">new</router-link></div>
        <div v-if="loggedIn" v-on:click="logout" class="col"><a href="#">logout</a></div>
      </nav>
    </div>
    <div class="subbanner"></div>
  </header>
</template>

<script>
import config from '../config';

export default {
  name: 'MainHeader',
  data() {
    return {
      loggedIn: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = await fetch(`${config.SERVER_URL}/login/validate?token=${token}`);
        const response = await data.json();
        this.loggedIn = response.valid;
      } catch (e) {
        this.logout();
        this.loggedIn = false;
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.loggedIn = false;
      this.$router.push({ path: 'home' });
    },
  },
};
</script>

<style>
</style>

