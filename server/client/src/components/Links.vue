<template>
  <div>
    <label class="search">Search:
      <input v-model="query" type="text" v-on:change="getLinks"/>
    </label>
    <nav class="sorter-nav">
      <label class="search">Sort By: </label>
      <button v-bind:class="{ active: sortedBy === 'topRated' }" v-on:click="sortBy('topRated')" type="button">Top Rated</button>
      <button v-bind:class="{ active: sortedBy === 'recentlyUploaded' }" v-on:click="sortBy('recentlyUploaded')" type="button">Recently Uploaded</button>
    </nav>
    <circle></circle>
    <h2 v-if="error">Oh no! We couldn't load the links. Try again later</h2>
    <h2 v-if="links.length === 0 && !loading">Nothing Found</h2>
    <ul class="links" v-for="link in links">
      <li>
        <div class="link">
          <div class="vote">
            <span v-bind:class="{ upvote: true, selected: link.user_rating === 1 }" v-on:click="upvote(link)"><icon name="arrow-circle-up"></icon></span>
              {{ link.user_rating ? link.total + link.user_rating : link.total }}
            <span v-bind:class="{ downvote: true, selected: link.user_rating === -1 }" v-on:click="downvote(link)"><icon name="arrow-circle-down"></icon></span>
          </div>
          <div>
            <span v-on:click="toggleView(link)" v-if="link.embed" class="youtube"><icon name="youtube-play"></icon></span>
            <span v-if="!link.embed" class="icon"><icon name="link"></icon></span>
            <span v-on:click="edit(link.id)" v-if="isAdmin" class="edit-icon"><icon name="edit"></icon></span>
            <a :href="link.url" target="_blank">{{link.title}}</a>
            <span class="subtitle"> {{ link.created_at | formatDate }} </span>
            <div class="link-tags">
              <a v-for="(tag, index) in link.tags" v-on:click="searchTag(tag.name)">{{tag.name }}<span v-if="index !== link.tags.length - 1">,</span></a>
            </div>
          </div>
          <span class="errors"> {{ link.errorMessage }} </span>
        </div>
        <iframe  v-if="link.embed && link.show" width="560" height="315" :src="link.embed" frameborder="0" allowfullscreen></iframe>
      </li>
    </ul>
    <h2 v-if="loading"><Circle></Circle></h2>
  </div>
</template>

<script>
import 'vue-awesome/icons/youtube-play';
import 'vue-awesome/icons/arrow-circle-up';
import 'vue-awesome/icons/arrow-circle-down';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/link';
import moment from 'moment';
import CircleSpin from 'vue-loading-spinner/src/components/Circle';

import config from '../config';
import lib from '../lib';
import sorter from '../lib/sorter';

export default {
  name: 'Links',
  components: {
    CircleSpin,
  },
  data: () => ({
    links: [],
    query: '',
    loading: true,
    isLoggedIn: false,
    isAdmin: false,
    user: {},
    headers: new Headers(),
    error: false,
    sortedBy: 'topRated',
    noMoreLinks: false,
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
        let url = `${config.SERVER_URL}/api/v1/links?offset=${this.links.length}`;
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
        console.log(response.links.length)
        if (response.links.length > 0) {
          this.links.push(...lib.addEmbed(response.links).sort((a, b) => {
            return b.rating - a.rating;
          }));
        } else {
          this.noMoreLinks = true;
        }
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
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'Login' });
      }
      link.user_rating = link.user_rating === 1 ? 0 : 1;
      this.updateVote(link);
    },
    downvote(link) {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'Login' });
      }
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
    sortBy(type) {
      this.sortedBy = type;
      this.links.sort(sorter[type]);
    },
  },
  filters: {
    formatDate(date) {
      return moment(date).format('MMMM Do YY');
    },
  },
};
</script>

<style>
</style>
