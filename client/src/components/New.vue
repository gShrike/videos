<template>
  <main>
    <h2>New Link</h2>
    <form class="tags">
      <div v-if="error" class="errors">
        <p> {{errorMessage}} </p>
      </div>
      <label for="title">Title: </label>
      <input type="text" v-model="title" id="title" required/>
      <label for="url">URL: </label>
      <input type="url" v-model="url" id="url" required/>
      <br>
      <label for="tag">Add a Tag: </label>
      <input type="text" v-model="tag" id="tag" v-on:keyup.13="addTag"/>
      <br>
      <span class="tag" v-on:click="removeTag(index)" v-for="(tag, index) in tags"> {{tag}} </span> 
      <span v-if="tags.length === 0"> No Tags </span>
      <br>
      <input class="show" v-on:click="submitLink" type="button" value="add"/>
    </form>
  </main>
</template>

<script>
import config from '../config';

export default {
  name: 'New',
  data() {
    return {
      addURL: `${config.SERVER_URL}/api/v1/links`,
      tags: [],
      token: '',
      username: '',
      title: '',
      url: '',
      tag: '',
      headers: {},
      error: false,
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
    } else {
      this.token = token;
      this.tags.push(JSON.parse(atob(token.split('.')[1])).name);
    }
  },
  methods: {
    async submitLink() {
      if (!this.isValid()) {
        try {
          const link = await this.postLink();
          await this.postTags(link);
          this.$router.push({ path: 'links' });
        } catch (e) {
          this.errorMessage = 'Unable to Add Link';
        }
      }
    },
    async postLink() {
      const body = {
        title: this.title,
        url: this.url,
      };
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${this.token}`);
      this.headers = headers;
      const settings = {
        method: 'post',
        body: JSON.stringify(body),
        headers,
      };
      try {
        const data = await fetch(`${config.SERVER_URL}/api/v1/links`, settings);
        const response = await data.json();
        if (response.error) {
          this.errorMessage = 'Unable to Add Link';
        } else {
          return response.link;
        }
      } catch (e) {
        this.errorMessage = 'Unable to Add Link';
      }
      return null;
    },
    async postTags(link) {
      const tagRequests = this.tags.map((tag) => {
        const tagBody = { tag };
        const settings = {
          method: 'post',
          body: JSON.stringify(tagBody),
          headers: this.headers,
        };
        return fetch(`${config.SERVER_URL}/api/v1/links/${link.id}/tags`, settings);
      });
      return Promise.all(tagRequests);
    },
    addTag() {
      if (this.tag && this.isUnique(this.tag)) {
        this.tags.push(this.tag);
        this.tag = '';
      }
    },
    removeTag(index) {
      this.tags = this.tags.filter((_, i) => i !== index);
    },
    isUnique(newTag) {
      return !this.tags.some(tag => tag === newTag);
    },
    logout() {
      localStorage.removeItem('token');
      window.location.href = '/';
    },
    isValid() {
      const valid = this.title.length === 0 || this.url.length === 0;
      if (!valid) {
        this.error = valid;
        this.errorMessage = 'Invalid Title or URL';
      }
      return valid;
    },
  },
};
</script>

<style>
</style>

