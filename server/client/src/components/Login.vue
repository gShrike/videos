<template>
  <main>
    <h2>Login</h2>
    <div class="login">
      <form id="submit" :action="loginURL" method="post">
        <button type="button" v-on:click="gitLogin" class="github primary button">
          <icon name="github"></icon>
        </button>
        <div v-if="error" class="errors">
          <p> {{ error }} </p>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import 'vue-awesome/icons/github';
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
