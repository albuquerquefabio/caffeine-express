import { exampleRoute } from './example/example.route'
import type { Express } from 'express'

export const router = (app: Express) => {
  exampleRoute(app, '/api/example')
  // Paths 404 from url
  app.get('/:url(api|assets|auth|config|lib|views)/*', (req, res) => {
    res.status(404).send({ error: 'Error 404: Route not found.' })
  })
}
