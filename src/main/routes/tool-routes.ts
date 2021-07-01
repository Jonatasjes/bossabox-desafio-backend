import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddToolsController } from '../factories/tool'

export default (router: Router): void => {
  router.post('/tools', adaptRoute(makeAddToolsController()))
}
