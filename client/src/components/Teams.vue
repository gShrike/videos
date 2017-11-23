<template>
  <main>
    <h1> Teams </h1>
    <h2 v-if="loading">Loading...</h2>
    <h2 v-if="error">Oh no! We couldn't load the teams. Try again later</h2>
    <section class="profile" v-for="team in teams">
      <img :src="team.image_url" :alt="team.name"/>
      <h3>{{team.name}}</h3>
    </section>
  </main>
</template>

<script>
import config from '../config';

export default {
  name: 'Teams',
  data: () => ({
    teams: [],
    loading: true,
    error: false,
  }),
  mounted() {
    fetch(`${config.SERVER_URL}/api/teams`)
      .then(response => response.json())
      .then((teams) => {
        this.loading = false;
        this.teams = teams;
      })
      .catch(() => {
        this.loading = false;
        this.error = true;
      });
  },
};
</script>

<style>
</style>
