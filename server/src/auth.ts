import * as passport from 'passport'

import { Strategy as GithubStrategy } from 'passport-github2'

passport.serializeUser(handleUser)

passport.deserializeUser(handleUser)

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.HOST}/login/github/callback`,
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      done(null, { profile, token: accessToken})
    });
  }
));

function handleUser(user, done): void {
  done(null, user)
}

export default passport
