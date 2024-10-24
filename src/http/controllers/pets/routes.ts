import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/jwt-verify'
import { verifyRole } from '@/http/middlewares/roles-verify'

export function petRoutes(app: FastifyInstance) {
  app.post('/pet/create', { onRequest: [verifyJWT, verifyRole('ORG')] }, create)
}
