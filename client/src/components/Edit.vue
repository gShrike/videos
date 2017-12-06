<template>
  <main>
    <h2>Edit Link</h2>
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
      <input class="show" v-on:click="submitLink" type="button" value="update"/>
      <input type="button" class="delete" v-on:click="remove" value="delete" />
    </form>
  </main>
</template>

<script>
import config from '../config';

export default {
  name: 'Edit',
  data() {
    return {
      editURL: `${config.SERVER_URL}/api/v1/links`,
      tags: [],
      token: '',
      username: '',
      title: '',
      url: '',
      tag: '',
      link: {},
      headers: {},
      error: false,
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const linkID = this.$route.params.id;
    if (!token) {
      this.logout();
    } else {
      this.token = token;
      this.link = await this.getLink(linkID);
      this.tags = this.link.tags.map(tag => tag.name);
      this.title = this.link.title;
      this.url = this.link.url;
    }
  },
  methods: {
    async submitLink() {
      if (!this.isValid()) {
        try {
          await this.editLink();
          await this.editTags();
          this.$router.push({ path: '/links' });
        } catch (e) {
          this.errorMessage = 'Unable to Edit Link';
        }
      }
    },
    getLink(id) {
      return fetch(`${config.SERVER_URL}/api/v1/links/${id}`)
        .then(data => data.json())
        .then(response => response.link)
        .catch(() => this.$router.push({ path: '/links' }));
    },
    async editLink() {
      const body = {
        title: this.title,
        url: this.url,
      };
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${this.token}`);
      this.headers = headers;
      const settings = {
        method: 'put',
        body: JSON.stringify(body),
        headers,
      };
      try {
        const data = await fetch(`${config.SERVER_URL}/api/v1/links/${this.link.id}`, settings);
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
    async editTags() {
      await this.removeTags(this.link.id);
      const tagRequests = this.tags.map((tag) => {
        const tagBody = { tag };
        const settings = {
          method: 'post',
          body: JSON.stringify(tagBody),
          headers: this.headers,
        };
        return fetch(`${config.SERVER_URL}/api/v1/links/${this.link.id}/tags`, settings);
      });
      return Promise.all(tagRequests);
    },
    addTag() {
      if (this.tag && this.isUnique(this.tag)) {
        this.tags.push(this.tag);
        this.tag = '';
      }
    },
    removeTags() {
      const settings = {
        method: 'delete',
        headers: this.headers,
      };
      return fetch(`${config.SERVER_URL}/api/v1/links/${this.link.id}/tags`, settings);
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
    async remove() {
      const settings = {
        method: 'delete',
        headers: this.headers,
      };
      await fetch(`${config.SERVER_URL}/api/v1/links/${this.link.id}`, settings);
      this.$router.push({ path: '/links' });
    },
  },
};
</script>

<style>
</style>

