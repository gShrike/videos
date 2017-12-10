# shrike-videos

- [Site](https://shrike-videos.firebaseapp.com/)
- [Tracker](https://trello.com/b/iCAmvRh9/shrike-videos)

## Admin Access

Make a get request to `/login/adminize` with your Github email and secret password.

`https://shrike-videos.firebaseapp.com/login/adminize?email=berto.ort@gmail.com&password=${secret}`

## CLI Upload

Add videos directly from the terminal using `svupload`. Code is found inside the `upload` directory.

```bash
npm install -g svupload
svupload
```
