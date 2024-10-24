import { ParameterNotFoundError } from '@/use-cases/Error/parameter-not-found-error'
import { makeCreatePet } from '@/use-cases/factory/make-create.pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    race: z.enum(['DOG', 'CAT', 'OTHERS']),
    color: z.string(),
    age: z.number(),
    org_id: z.string().uuid(),
  })

  const { age, color, name, race, org_id } = createPetSchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePet()
    const { pet } = await createPetUseCase.execute({
      age,
      color,
      name,
      org_id,
      race,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof ParameterNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
