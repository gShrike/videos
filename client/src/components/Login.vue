<template>
  <main>
    <h2>Login</h2>
    <div class="login">
      <form id="submit" :action="loginURL" method="post">
        <input v-on:click="gitLogin" type="button" class="github show" value="Github"/>
        <div v-if="error" class="errors">
          <p> {{ error }} </p>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import qs from 'qs';
import config from '../config';

export default {
  name: 'Login',
  data() {
    return {
      loginURL: `${config.SERVER_URL}/login`,
      error: false,
    };
  },
  mounted() {
    const query = qs.parse(location.search.substr(1));
    if (query.error === 'invalid') {
      this.error = 'Invalid Name or Password';
    } else if (query.error === 'unauthorized') {
      this.error = 'Unathorized Account';
    }
  },
  methods: {
    gitLogin() {
      window.location.href = `${config.SERVER_URL}/login/github`;
    },
  },
};
</script>

<style>
</style>
