import { makeCreateUser } from '@/use-cases/factory/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export function createUser(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userSchema.parse(request.body)

  try {
    const userUseCase = makeCreateUser()
    userUseCase.execute({ name, email, password })
  } catch (error) {
    return reply.status(400).send({ message: error })
  }

  return reply.status(201).send({ message: 'Cadastro criado com sucesso.' })
}
