import { Test } from '@nestjs/testing'
import { FindAllUsersOutput, FindByOutput } from '../dtos'
import { UsersQueries } from '../resolvers/users.queries'
import { UsersService } from '../users.service'
import { userStub } from './__stubs/user.stub'

jest.mock('../users.service')

describe('UserQueries', () => {
    const context: any = {}
    let usersService: UsersService
    let usersQueries: UsersQueries

    beforeEach(async () => {
        const _module = await Test.createTestingModule({
            providers: [UsersService, UsersQueries],
        }).compile()

        usersService = _module.get<UsersService>(UsersService)
        usersQueries = _module.get<UsersQueries>(UsersQueries)

        jest.clearAllMocks()
    })

    describe('myAccount', () => {
        describe('when myAccount is called', () => {
            let output: FindByOutput
            beforeEach(async () => {
                output = await usersQueries.myAccount(context)
            })

            test('then it should call userService', () => {
                expect(usersService.myAccount).toBeCalled()
            })

            test('then is sould return a user', () => {
                expect(output.user).toEqual(userStub())
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('findAllUsers', () => {
        describe('when findAllUsers is called', () => {
            let output: FindAllUsersOutput
            beforeEach(async () => {
                output = await usersQueries.findAllUsers()
            })

            test('then it should call userService', () => {
                expect(usersService.findAllUsers).toBeCalled()
            })

            test('then is sould return a users', () => {
                expect(output.users).toEqual([userStub()])
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('findById', () => {
        describe('when findById is called', () => {
            let output: FindByOutput
            beforeEach(async () => {
                output = await usersQueries.findById({ id: userStub().id })
            })

            test('then it should call userService', () => {
                expect(usersService.findById).toBeCalledWith({ id: userStub().id })
            })

            test('then is sould return a user', () => {
                expect(output.user).toEqual(userStub())
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('findByPhone', () => {
        describe('when findByPhone is called', () => {
            let output: FindByOutput
            beforeEach(async () => {
                output = await usersQueries.findByPhone({ phone: userStub().phone })
            })

            test('then it should call userService', () => {
                expect(usersService.findByPhone).toBeCalledWith({ phone: userStub().phone })
            })

            test('then is sould return a user', () => {
                expect(output.user).toEqual(userStub())
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('findByEmail', () => {
        describe('when findByEmail is called', () => {
            let output: FindByOutput
            beforeEach(async () => {
                output = await usersQueries.findByEmail({ email: userStub().email })
            })

            test('then it should call userService', () => {
                expect(usersService.findByEmail).toBeCalledWith({ email: userStub().email })
            })

            test('then is sould return a user', () => {
                expect(output.user).toEqual(userStub())
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })
})
