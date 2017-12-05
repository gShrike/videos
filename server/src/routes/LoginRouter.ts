import {Router, Request, Response, NextFunction} from 'express'
import auth from '../auth'
import * as jwt from 'jsonwebtoken'

export class LoginRouter {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public gitCallback(req: Request, res: Response, next: NextFunction) {
    auth.passport.authenticate('github', function(error: any, payload: any) {
      if (error) {
        res.redirect(`${process.env.CLIENT_URL}/login`)
      } else if (auth.isAdmin(payload.profile.emails[0].value)) {
        const token = auth.createToken(payload)
        res.redirect(`${process.env.CLIENT_URL}/token?token=${token}`);
      } else {
        res.redirect(`${process.env.CLIENT_URL}/login?error=unauthorized`)
      }
    })(req, res, next)
  }

  public login(req: Request, res: Response, next: NextFunction) {
    if (req.body.name === process.env.ADMIN_NAME && req.body.password === process.env.ADMIN_PASSWORD) {
      const token = auth.createToken({ profile: {name: 'Berto Ortega', email: 'roberto.ortega@galvanize.com' } })
      res.redirect(`${process.env.CLIENT_URL}/token?token=${token}`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/login?error=invalid`)
    }
  }

  public validate(req: Request, res: Response, next: NextFunction) {
    const token = jwt.verify(req.query.token, process.env.TOKEN_SECRET)
    let valid = false
    if (token) {
      valid = true 
    }
    res.json({ valid })
  }

  init() {
    this.router.get('/github', auth.passport.authenticate('github', {scope: [ 'user:email']}))
    this.router.get('/github/callback', this.gitCallback)
    this.router.get('/validate', this.validate)
    this.router.post('/', this.login)
  }

}

const loginRoutes = new LoginRouter()
loginRoutes.init()

export default loginRoutes.router
