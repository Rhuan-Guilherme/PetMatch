import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env/env'
import fastifyJwt from '@fastify/jwt'
import { orgRoutes } from './http/controllers/orgs/routes'

export const app = fastify()
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)
app.register(orgRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação', description: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
