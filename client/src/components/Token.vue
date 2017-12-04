<template>
  <h3> Logging In... </h3>
</template>

<script>
import qs from 'qs';

export default {
  name: 'Token',
  mounted() {
    const query = qs.parse(location.search.substr(1));
    localStorage.setItem('token', query.token);
    window.location.href = '/';
  },
};
</script>

<style>
</style>
