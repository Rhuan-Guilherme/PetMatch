import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-reposiotry'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticate() {
  const userRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
