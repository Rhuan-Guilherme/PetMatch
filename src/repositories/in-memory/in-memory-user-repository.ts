import { Prisma, User, Roles } from '@prisma/client'
import { UserRepositoryInterface } from '../user-repository-interface'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UserRepositoryInterface {
  public item: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: Roles.MEMBER,
      password_hash: data.password_hash,
    }

    this.item.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.item.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.item.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
