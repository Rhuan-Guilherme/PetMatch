import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { describe, expect, test, beforeEach } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../Error/invalid-credentials-error'

let userRepository: InMemoryUserRepository
let sup: AuthenticateUseCase

describe('Autenticação do usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sup = new AuthenticateUseCase(userRepository)
  })

  test('Deve ser possível se autenticar como um usuário.', async () => {
    await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sup.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.email).toEqual(expect.stringContaining('jonhdoe@example.com'))
    expect(user.id).toEqual(expect.any(String))
  })

  test('Não deve ser possível se autenticar com um e-mail não cadastrado.', async () => {
    await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sup.execute({
        email: 'notexists@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('Não deve ser possível se autenticar com uma senha errada', async () => {
    await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sup.execute({
        email: 'jonhdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
