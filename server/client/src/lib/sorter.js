export default {
  topRated(a, b) {
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;
    return 0;
  },
  recentlyUploaded(a, b) {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  },
};
