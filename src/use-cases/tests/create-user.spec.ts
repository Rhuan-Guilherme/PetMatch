import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { describe, expect, test, beforeEach } from 'vitest'
import { CreateUserUseCase } from '../create-user'

let userRepository: InMemoryUserRepository
let sup: CreateUserUseCase

describe('Criação de usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sup = new CreateUserUseCase(userRepository)
  })

  test('Deve ser possível criar um usuário', async () => {
    const { user } = await sup.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
