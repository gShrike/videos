<template>
  <main>
    <div class="search container">
      <label>Search: </label>
      <input class="search" type="text"/>
      <h2 v-if="loading">Loading...</h2>
      <h2 v-if="error">Oh no! We couldn't load the links. Try again later</h2>
      <section class="links" v-for="link in links">
        <h5><a :href="link.url">{{link.title}}</a></h5>
        <iframe  v-if="link.embed" width="560" height="315" :src="link.embed" frameborder="0" allowfullscreen></iframe>
      </section>
    </div>
  </main>
</template>

<script>
import config from '../config';
import lib from '../lib';

export default {
  name: 'Links',
  data: () => ({
    links: [],
    loading: true,
    error: false,
  }),
  mounted() {
    fetch(`${config.SERVER_URL}/api/v1/links`)
      .then(data => data.json())
      .then((response) => {
        this.loading = false;
        this.links = lib.addEmbed(response.links);
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
