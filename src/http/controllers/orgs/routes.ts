import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/jwt-verify'
import { verifyRole } from '@/http/middlewares/roles-verify'
import { getOrg } from './get-org'

export function orgRoutes(app: FastifyInstance) {
  app.post('/org/create', { onRequest: [verifyJWT, verifyRole('ORG')] }, create)
  app.get('/org/:id', { onRequest: [verifyJWT] }, getOrg)
}
