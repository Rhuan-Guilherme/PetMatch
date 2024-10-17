import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-reposiotry'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUser() {
  const userRepository = new PrismaUserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  return createUserUseCase
}
