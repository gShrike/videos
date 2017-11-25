import * as dotenv from 'dotenv'

dotenv.config()

const development = {
  client: 'pg',
  connection:'postgres://localhost/shrike-videos'
}

const production = {
  client: 'pg',
  connection: process.env.DATABASE_URL
}

export {development, production}
