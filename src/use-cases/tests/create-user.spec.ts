import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { describe, expect, test, beforeEach } from 'vitest'
import { CreateUserUseCase } from '../create-user'
import { EmailAlreadyExistsError } from '../Error/email-already-exists-error'
import { compare } from 'bcryptjs'

let userRepository: InMemoryUserRepository
let sup: CreateUserUseCase

describe('Criação de usuário', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sup = new CreateUserUseCase(userRepository)
  })

  test('Deve ser possível cadastrar um usuário.', async () => {
    const { user } = await sup.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Não deve ser possível cadastrar um usuário com um email ja existente.', async () => {
    await sup.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(() =>
      sup.execute({
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  test('Deve ser possível encaminhar uma senha encriptografada para o banco de dados', async () => {
    const { user } = await sup.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    const passhwordHashed = await compare('123456', user.password_hash)

    expect(passhwordHashed).toEqual(true)
  })
})
