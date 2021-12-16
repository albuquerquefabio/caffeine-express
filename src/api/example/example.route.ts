import { Express } from 'express'
import { exampleCtrl } from './example.controller'

export const exampleRoute = (app: Express, route: string) => {
  app
    .post(route, exampleCtrl.create())
    .get(route, exampleCtrl.list())
    .get(route + '/:id', exampleCtrl.read())
    .put(route + '/:id', exampleCtrl.update())
    .delete(route + '/:id', exampleCtrl.delete())
}
