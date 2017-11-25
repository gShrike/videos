# Shrike Videos API

## Usage

Run with `npm start`. 

### Development

Start `gulp`. 

Create database `shrike-videos` on postgres.

Run migrations with `npm run migrate`.

Run seeds with `npm run seed`.

## Deployment to Heroku

```
heroku create
git push heroku master
heroku addons:create heroku-postgresql
heroku run npm run migrate
heroku open
```
