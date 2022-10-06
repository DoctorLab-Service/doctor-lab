import { Role } from 'src/roles/entities'
import { Repository } from 'typeorm'

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

export type UserStub = User
