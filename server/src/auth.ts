import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'
import { Strategy as GithubStrategy } from 'passport-github2'

const handleUser = function(user, done): void {
  done(null, user)
}

const adminEmails = ['berto.ort@gmail.com']

const createToken = function(payload) {
  const data = { name: payload.profile.displayName, email: payload.profile.email }
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' })
} 

const isAdmin = function(enteredEmail) {
  return adminEmails.some(email => email === enteredEmail)
}

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

export default {
  passport,
  isAdmin,
  createToken
}
