import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { describe, expect, test, beforeEach } from 'vitest'
import { GetUserUseCase } from '../get-user'
import { hash } from 'bcryptjs'

let userRepository: InMemoryUserRepository
let sup: GetUserUseCase

describe('Resgara dados do usuário.', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sup = new GetUserUseCase(userRepository)
  })

  test('Deve ser possível obter um usuário pelo ID.', async () => {
    const userCreate = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sup.execute({ userId: userCreate.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual(expect.stringMatching('jonhdoe@example.com'))
  })
})
