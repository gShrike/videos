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
        <div class="col"><router-link to="/links">links</router-link></div>
        <div v-if="!loggedIn" class="col"><router-link to="/login">login</router-link></div>
        <div v-if="loggedIn && isAdmin" class="col"><router-link to="/new">new</router-link></div>
        <div v-if="loggedIn" v-on:click="logout" class="col"><a href="#">logout</a></div>
      </nav>
    </div>
    <div class="subbanner"></div>
  </header>
</template>

<script>
import lib from '../lib';

export default {
  name: 'MainHeader',
  data() {
    return {
      loggedIn: false,
    };
  },
  async mounted() {
    this.loggedIn = await lib.isLoggedIn();
    const user = lib.getTokenUser();
    if (user) {
      this.isAdmin = user.isAdmin;
    }
  },
  methods: {
    logout() {
      lib.logout();
    },
  },
};
</script>

<style>
</style>

