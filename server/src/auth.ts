import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'
import { Strategy as GithubStrategy } from 'passport-github2'

const handleUser = function(user, done): void {
  done(null, user)
}

const createToken = function(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' })
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

const validateAdmin = function(req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('Authorization')
  if (authorization) {
    const token = authorization.substring(7)
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    decoded.isAdmin ?  next() : res.json({ error: 'Unauthorized' })
  } else {
    res.json({ error: 'Unauthorized' })
  }
}

const validateUser = function(req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('Authorization')
  if (authorization) {
    const token = authorization.substring(7)
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    decoded ?  next() : res.json({ error: 'Unauthorized' })
  } else {
    res.json({ error: 'Unauthorized' })
  }
}

export default {
  passport,
  createToken,
  validateAdmin,
  validateUser
}
