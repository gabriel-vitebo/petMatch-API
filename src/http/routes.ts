import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'
import { orgProfile } from './controllers/org-profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', orgProfile)
}
