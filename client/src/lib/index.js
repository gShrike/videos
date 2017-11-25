import URL from 'url-parse';
import qs from 'qs';

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
};
