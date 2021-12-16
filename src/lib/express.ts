import express from 'express'
import type { Express } from 'express'
import cors from 'cors'

const expressConfig = (app: Express) => {
  app
    .use(cors())
    .use(express.json({ limit: '5mb' }))
    .use(express.urlencoded({ extended: false }))
}

export default expressConfig
