import express from 'express'
import expressConfig from './lib/express'
import mongoConnect from './lib/mongo'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || 'localhost'

expressConfig(app)
mongoConnect()

app.listen(port, host, () =>
  console.log(`App listening on port http://${host}:${port}`)
)
