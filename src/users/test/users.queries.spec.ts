import { Test } from '@nestjs/testing'
import { FindAllUsersOutput, FindByOutput } from '../dtos'
import { User } from '../entities'
import { UsersQueries } from '../resolvers/users.queries'
import { UsersService } from '../users.service'
import { userStub } from './__stubs/user.stub'

jest.mock('../users.service')

describe('UserQueries', () => {
    const context: any = {}
    let usersService: UsersService
    let usersQueries: UsersQueries
    let mockUser: User

    beforeEach(async () => {
        mockUser = { ...userStub() }

        const _module = await Test.createTestingModule({
            providers: [UsersService, UsersQueries],
        }).compile()

        usersService = _module.get<UsersService>(UsersService)
        usersQueries = _module.get<UsersQueries>(UsersQueries)
    })
    afterEach(async () => {
        jest.clearAllMocks()
    })

    describe('myAccount', () => {
        let output: FindByOutput

        beforeEach(async () => {
            output = await usersQueries.myAccount(context)
        })

        test('should call userService', () => {
            expect(usersService.myAccount).toBeCalled()
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
            output = await usersQueries.findAllUsers()
        })

        test('should call userService', () => {
            expect(usersService.findAllUsers).toBeCalled()
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
            output = await usersQueries.findById({ id: mockUser.id })
        })

        test('then it should call userService', () => {
            expect(usersService.findById).toBeCalledWith({ id: mockUser.id })
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
            output = await usersQueries.findByPhone({ phone: mockUser.phone })
        })

        test('should call userService', () => {
            expect(usersService.findByPhone).toBeCalledWith({ phone: mockUser.phone })
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
            output = await usersQueries.findByEmail({ email: mockUser.email })
        })

        test('should call userService', () => {
            expect(usersService.findByEmail).toBeCalledWith({ email: mockUser.email })
        })

        test('should return a user', () => {
            expect(output).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })
    })
})
