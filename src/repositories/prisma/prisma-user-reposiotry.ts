import { prisma } from '@/lib/prisma'
import { UserRepositoryInterface } from '../user-repository-interface'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository implements UserRepositoryInterface {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
