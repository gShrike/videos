import URL from 'url-parse';
import qs from 'qs';

import config from '../config';

export default {
  addEmbed: links => (
    links.map((link) => {
      const embedLink = link;
      const url = new URL(link.url);
      if (url.host === 'www.youtube.com') {
        const query = qs.parse(url.query.substr(1));
        embedLink.embed = `https://www.youtube.com/embed/${query.v}`;
      }
      return embedLink;
    })
  ),
  async isLoggedIn() {
    const token = localStorage.getItem('token');
    let valid = false;
    if (token) {
      try {
        const data = await fetch(`${config.SERVER_URL}/login/validate?token=${token}`);
        const response = await data.json();
        valid = response.valid;
      } catch (e) {
        this.logout();
      }
      if (!valid) {
        this.logout();
      }
    }
    return valid;
  },
  getTokenUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return undefined;
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },
};
