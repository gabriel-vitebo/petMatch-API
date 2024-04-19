import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { orgProfile } from './org-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, orgProfile)
}
