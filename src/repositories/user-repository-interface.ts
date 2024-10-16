import { Prisma, User } from '@prisma/client'

export interface UserRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>
}
