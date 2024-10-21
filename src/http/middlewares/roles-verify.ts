import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(roleVerify: 'MEMBER' | 'ORG' | 'ADMIN') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const role = request.user.role

    if (role !== roleVerify) {
      return reply.status(401).send({ message: 'Não autorizado.' })
    }
  }
}
