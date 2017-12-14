<template>
  <div class="search">
    <label>Search: </label>
    <input class="search" v-model="query" type="text" v-on:change="getLinks"/>
    <h2 v-if="loading">Loading...</h2>
    <h2 v-if="error">Oh no! We couldn't load the links. Try again later</h2>
    <h2 v-if="links.length === 0 && !loading">Nothing Found</h2>
    <ul class="links" v-for="link in links">
      <li>
        <div class="tags">
          <h4><a :href="link.url" target="_blank">{{link.title}}</a></h4>
          <p class="subtitle"> {{ link.created_at | formatDate }} </p>
          <p class="rating"> {{ link.user_rating ? link.total + link.user_rating : link.total }} 👍</p>
          <ul>
            <li v-for="tag in link.tags" v-on:click="searchTag(tag.name)" class="tag">{{tag.name}}</li>
          </ul>
          <input type="button" class="show" v-on:click="toggleView(link)" v-if="link.embed" value="View" />
          <input type="button" class="edit" v-on:click="edit(link.id)" v-if="isAdmin" value="Edit" />
          <input type="button" v-bind:class="{ upvote: true, selected: link.user_rating === 1 }" v-on:click="upvote(link)" v-if="isLoggedIn" value="👍" />
          <input type="button" v-bind:class="{ downvote: true, selected: link.user_rating === -1 }" v-on:click="downvote(link)" v-if="isLoggedIn" value="👎" />
          <span class="errors"> {{ link.errorMessage }} </span>
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
    isLoggedIn: false,
    isAdmin: false,
    user: {},
    headers: new Headers(),
    error: false,
  }),
  async mounted() {
    this.query = this.$route.query.q;
    this.isLoggedIn = await lib.isLoggedIn();
    this.token = localStorage.getItem('token');
    const user = lib.getTokenUser();
    this.user = user;
    if (this.user) {
      this.isAdmin = user.isAdmin;
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', `Bearer ${this.token}`);
    }
    this.getLinks();
  },
  methods: {
    /*eslint-disable */
    async getLinks() {
      try {
        let url = `${config.SERVER_URL}/api/v1/links`;
        if (this.query) {
          this.$router.push({ query: { q: this.query } });
          url += `?q=${this.query}`;
        } else {
          this.$router.push({ query: {} });
        }
        const settings = {
          method: 'get',
          headers: this.headers,
        }
        this.loading = true;
        const data = await fetch(url, settings);
        const response = await data.json();
        this.loading = false;
        response.links = this.formatLink(response.links);
        this.links = lib.addEmbed(response.links);
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
    },
    formatLink(links) {
      return links.map((link) => {
        link.errorMessage = '';
        link.total = link.user_rating ? link.rating - link.user_rating: link.rating;
        return link;
      });
    },
    upvote(link) {
      link.user_rating = link.user_rating === 1 ? 0 : 1;
      this.updateVote(link);
    },
    downvote(link) {
      link.user_rating = link.user_rating === -1 ? 0 : -1;
      this.updateVote(link);
    },
    async updateVote(link) {
      const url = `${config.SERVER_URL}/api/v1/links/${link.id}/rating`;
      const body = {
        user_id: this.user.id,
        rating: link.user_rating,
      };
      const settings = {
        method: 'put',
        body: JSON.stringify(body),
        headers: this.headers,
      };
      try {
        const data = await fetch(url, settings);
        const response = await data.json();
        if (response.error) {
          link.errorMessage = 'Unable to Rate';
        } else {
          link.errorMessage = '';
        }
      } catch (e) {
        link.errorMessage = 'Unable to Rate';
      }
    },
    /*eslint-enable */
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
