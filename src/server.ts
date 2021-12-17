import express from 'express'
import expressConfig from './lib/express'
import mongoConnect from './lib/mongo'
import dotenv from 'dotenv'
import { router } from './api/router'
import { socketServer } from './lib/socket'

dotenv.config()

const app = express()

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || 'localhost'

expressConfig(app)
mongoConnect()
router(app)

const server = app.listen(port, host, () =>
  console.log(`App listening on port http://${host}:${port}`)
)
// Socket running at the same server's host and port
socketServer.connect(server, { port, host })
