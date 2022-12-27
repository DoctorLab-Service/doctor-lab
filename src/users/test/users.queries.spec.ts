import { Test } from '@nestjs/testing'
import { FindAllUsersOutput, FindByOutput } from '../dtos'
import { User } from '../entities'
import { UsersQueries } from '../resolvers/users.queries'
import { UsersService } from '../users.service'
import { userStub } from './__stubs/user.stub'

jest.mock('../users.service')

describe('UserQueries', () => {
    const context: any = {}
    let service: UsersService
    let queries: UsersQueries
    let mockUser: User

    beforeEach(async () => {
        mockUser = { ...userStub() }

        const _module = await Test.createTestingModule({
            providers: [UsersService, UsersQueries],
        }).compile()

        service = _module.get<UsersService>(UsersService)
        queries = _module.get<UsersQueries>(UsersQueries)
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('myAccount', () => {
        let output: FindByOutput

        beforeEach(async () => {
            output = await queries.myAccount(context)
        })

        test('should call myAccount from service', () => {
            expect(service.myAccount).toBeCalled()
        })

        test('sould return a user', () => {
            expect(output).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })
    })

    describe('findAllUsers', () => {
        let output: FindAllUsersOutput

        beforeEach(async () => {
            output = await queries.findAllUsers()
        })

        test('should call findAllUsers from service', () => {
            expect(service.findAllUsers).toBeCalled()
        })

        test('sould return a users', () => {
            expect(output).toMatchObject({
                ok: true,
                users: [mockUser],
            })
        })
    })

    describe('findById', () => {
        let output: FindByOutput

        beforeEach(async () => {
            output = await queries.findById({ id: mockUser.id })
        })

        test('then it should call findById from service', () => {
            expect(service.findById).toBeCalledWith({ id: mockUser.id })
        })

        test('then it should return a user', () => {
            expect(output).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })
    })

    describe('findByPhone', () => {
        let output: FindByOutput

        beforeEach(async () => {
            output = await queries.findByPhone({ phone: mockUser.phone })
        })

        test('should call findByPhone from service', () => {
            expect(service.findByPhone).toBeCalledWith({ phone: mockUser.phone })
        })

        test('should return a user', () => {
            expect(output).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })
    })

    describe('findByEmail', () => {
        let output: FindByOutput

        beforeEach(async () => {
            output = await queries.findByEmail({ email: mockUser.email })
        })

        test('should call findByEmail from service', () => {
            expect(service.findByEmail).toBeCalledWith({ email: mockUser.email })
        })

        test('should return a user', () => {
            expect(output).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })
    })
})
