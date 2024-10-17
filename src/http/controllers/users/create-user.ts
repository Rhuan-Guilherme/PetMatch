import { EmailAlreadyExistsError } from '@/use-cases/Error/email-already-exists-error'
import { makeCreateUser } from '@/use-cases/factory/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userSchema.parse(request.body)

  try {
    const userUseCase = makeCreateUser()
    await userUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send({ message: 'Cadastro criado com sucesso.' })
}
