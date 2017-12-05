import * as path from 'path'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.load()

import LinkRouter from './routes/LinkRouter'
import LoginRouter from './routes/LoginRouter'
import TagRouter from './routes/TagRouter'
import auth from './auth'

class App {

  public app: express.Application

  constructor() {
    this.app = express()
    this.middleware()
    this.routes()
  }

  private middleware(): void {
    this.app.use(cors())
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(auth.passport.initialize())
    this.app.use(auth.passport.session())
  }

  private routes(): void {
    let router = express.Router()
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Shrike Videos API',
        endpoints: [
          '/api/v1/links',
          '/api/v1/tags'
        ]
      })
    })
    this.app.use('/', router)
    this.app.use('/login', LoginRouter)
    this.app.use('/api/v1/links', LinkRouter)
    this.app.use('/api/v1/tags', TagRouter)
  }

}

export default new App().app
