import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/jwt-verify'

export function orgRoutes(app: FastifyInstance) {
  app.post('/org/create', { onRequest: [verifyJWT] }, create)
}
