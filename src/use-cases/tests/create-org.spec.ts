import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { describe, expect, test, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { CreateOrgUseCase } from '../create-org'
import { ParameterNotFoundError } from '../Error/parameter-not-found-error'

let userRepository: InMemoryUserRepository
let orgRepository: InMemoryOrgRepository
let sup: CreateOrgUseCase

describe('Criação de uma ORG', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    orgRepository = new InMemoryOrgRepository()
    sup = new CreateOrgUseCase(orgRepository, userRepository)
  })

  test('Deve ser possível criar uma ORG.', async () => {
    const user = await userRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sup.execute({
      name: 'DogCia',
      cidade: 'Brasília',
      description: 'Venha adotar seu pet',
      phone: '(61) 999999999',
      userId: user.id,
    })

    expect(org.name).toEqual(expect.stringContaining('DogCia'))
    expect(org.id).toEqual(expect.any(String))
  })

  test('Não deve ser possível criar uma ORG sem um usuário ja cadastrado.', async () => {
    await expect(() =>
      sup.execute({
        name: 'DogCia',
        cidade: 'Brasília',
        description: 'Venha adotar seu pet',
        phone: '(61) 999999999',
        userId: 'not-exists-id',
      }),
    ).rejects.toBeInstanceOf(ParameterNotFoundError)
  })
})
