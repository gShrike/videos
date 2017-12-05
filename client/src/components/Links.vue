<template>
  <div class="search">
    <label>Search: </label>
    <input class="search" type="text"/>
    <h2 v-if="loading">Loading...</h2>
    <h2 v-if="error">Oh no! We couldn't load the links. Try again later</h2>
    <ul class="links" v-for="link in links">
      <li>
        <h2><a :href="link.url">{{link.title}}</a></h2>
        <ul class="tags">
          <li v-for="tag in link.tags" class="tag">{{tag.name}}</li>
        </ul>
        <input type="button" class="show" v-on:click="toggleView(link)" v-if="link.embed" value="View" />
        <input type="button" class="edit" v-on:click="edit(link.id)" v-if="loggedIn" value="Edit" />
        <iframe  v-if="link.embed && link.show" width="560" height="315" :src="link.embed" frameborder="0" allowfullscreen></iframe>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '../config';
import lib from '../lib';

export default {
  name: 'Links',
  data: () => ({
    links: [],
    loading: true,
    loggedIn: false,
    error: false,
  }),
  async mounted() {
    this.loggedIn = await lib.isLoggedIn();
    try {
      const data = await fetch(`${config.SERVER_URL}/api/v1/links`);
      const response = await data.json();
      this.loading = false;
      this.links = lib.addEmbed(response.links);
    } catch (e) {
      this.loading = false;
      this.error = true;
    }
  },
  methods: {
    toggleView(link) {
      this.$set(link, 'show', !link.show);
    },
    edit(id) {
      this.$router.push({ name: 'Edit', params: { id } });
    },
  },
};
</script>

<style>
</style>
