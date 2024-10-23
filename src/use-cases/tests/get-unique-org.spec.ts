import { describe, expect, test, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { GetUniqueOrgUseCase } from '../get-unique-org'
import { randomUUID } from 'crypto'
import { User } from '@prisma/client'

let orgRepository: InMemoryOrgRepository
let sup: GetUniqueOrgUseCase

describe('Busca por uma org pelo ID.', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sup = new GetUniqueOrgUseCase(orgRepository)
  })

  test('Deve ser possível buscar uma ORG pelo ID.', async () => {
    const user: User = {
      id: randomUUID(),
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      role: 'ORG',
    }

    const orgResponse = await orgRepository.create({
      name: 'DogCia',
      cidade: 'Brasília',
      description: 'Venha adotar seu pet',
      phone: '(61) 999999999',
      user: { connect: user },
    })

    const { org } = await sup.execute({ orgId: orgResponse.id })

    expect(org.name).toEqual(expect.stringContaining('DogCia'))
    expect(org.id).toEqual(expect.any(String))
    expect(org).toEqual(expect.objectContaining({ phone: '(61) 999999999' }))
  })
})
