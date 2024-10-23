import { describe, expect, test, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { CreatePetUseCase } from '../create-pet'
import { User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ParameterNotFoundError } from '../Error/parameter-not-found-error'

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sup: CreatePetUseCase

describe('Criação de um pet', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sup = new CreatePetUseCase(petRepository, orgRepository)
  })

  test('Deve ser possível criar um pet.', async () => {
    const user: User = {
      id: randomUUID(),
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      role: 'ORG',
    }

    const org = await orgRepository.create({
      name: 'DogCia',
      cidade: 'Brasília',
      description: 'Venha adotar seu pet',
      phone: '(61) 999999999',
      user: { connect: user },
    })

    const { pet } = await sup.execute({
      name: 'doguinho',
      age: 1,
      color: 'white',
      race: 'DOG',
      org_id: org.id,
    })

    expect(pet.name).toEqual(expect.stringContaining('doguinho'))
    expect(pet.id).toEqual(expect.any(String))
  })

  test('Não deve ser possível criar um pet sem uma org cadastrada.', async () => {
    expect(() =>
      sup.execute({
        name: 'doguinho',
        age: 1,
        color: 'white',
        race: 'DOG',
        org_id: 'not-id',
      }),
    ).rejects.toBeInstanceOf(ParameterNotFoundError)
  })
})
