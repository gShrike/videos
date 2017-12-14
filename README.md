# shrike-videos

- [Site](https://shrike-videos.firebaseapp.com/)
- [Tracker](https://trello.com/b/iCAmvRh9/shrike-videos)

## Admin Access

Make a get request to `/login/adminize` with your Github username and secret password.

`https://shrike-videos.herokuapp.com/login/adminize?username=berto&password=videos`

## CLI Upload

Add videos directly from the terminal using `svupload`. Code is found inside the `upload` directory.

```bash
npm install -g svupload
svupload
```
