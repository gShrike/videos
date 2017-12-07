<template>
  <div class="search">
    <label>Search: </label>
    <input class="search" v-model="query" type="text" v-on:change="getLinks"/>
    <h2 v-if="loading">Loading...</h2>
    <h2 v-if="error">Oh no! We couldn't load the links. Try again later</h2>
    <ul class="links" v-for="link in links">
      <li>
        <div class="tags">
          <h4><a :href="link.url" target="_blank">{{link.title}}</a></h4>
          <p class="subtitle"> {{ link.created_at | formatDate }} </p>
          <ul>
            <li v-for="tag in link.tags" v-on:click="searchTag(tag.name)" class="tag">{{tag.name}}</li>
          </ul>
          <input type="button" class="show" v-on:click="toggleView(link)" v-if="link.embed" value="View" />
          <input type="button" class="edit" v-on:click="edit(link.id)" v-if="isAdmin" value="Edit" />
          <iframe  v-if="link.embed && link.show" width="560" height="315" :src="link.embed" frameborder="0" allowfullscreen></iframe>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';
import config from '../config';
import lib from '../lib';

export default {
  name: 'Links',
  data: () => ({
    links: [],
    query: '',
    loading: true,
    loggedIn: false,
    isAdmin: false,
    error: false,
  }),
  async mounted() {
    this.query = this.$route.query.q;
    this.loggedIn = await lib.isLoggedIn();
    const user = lib.getTokenUser();
    if (user) {
      this.isAdmin = user.isAdmin;
    }
    this.getLinks();
  },
  methods: {
    async getLinks() {
      try {
        let url = `${config.SERVER_URL}/api/v1/links`;
        if (this.query) {
          this.$router.push({ query: { q: this.query } });
          url += `?q=${this.query}`;
        }
        const data = await fetch(url);
        const response = await data.json();
        this.loading = false;
        this.links = lib.addEmbed(response.links);
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
    },
    searchTag(name) {
      this.query = name;
      this.getLinks();
    },
    toggleView(link) {
      this.$set(link, 'show', !link.show);
    },
    edit(id) {
      this.$router.push({ name: 'Edit', params: { id } });
    },
  },
  filters: {
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY');
    },
  },
};
</script>

<style>
</style>
