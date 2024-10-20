import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-reposiotry'
import { GetUserUseCase } from '../get-user'

export function makeGetUser() {
  const userRepository = new PrismaUserRepository()
  const getUserUseCase = new GetUserUseCase(userRepository)

  return getUserUseCase
}
