import { Test } from '@nestjs/testing'
import { FileUpload } from 'graphql-upload'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { GenerateTokens } from 'src/token/config/types'
import {
    ChangeEmailInput,
    ChangeOutput,
    ChangePasswordInput,
    ChangePhoneInput,
    CreateAccountInput,
    CreateAccountOutput,
    DeleteAccountOutput,
    UpdateAccountInput,
    UpdateAccountOutput,
} from '../dtos'
import { User } from '../entities'
import { UsersMutations } from '../resolvers/users.mutations'
import { UsersService } from '../users.service'
import { userStub, userUpdateStub, changePasswordStub, changeEmailStub, changePhoneStub, tokensStub } from './__stubs'

jest.mock('../users.service')

describe('UserMutations', () => {
    const context: any = {}
    let service: UsersService
    let mutations: UsersMutations
    let mockUser: User
    let mockTokens: GenerateTokens

    beforeEach(async () => {
        mockUser = { ...userStub() }
        mockTokens = { ...tokensStub() }

        const _module = await Test.createTestingModule({
            providers: [UsersService, UsersMutations],
        }).compile()

        service = _module.get<UsersService>(UsersService)
        mutations = _module.get<UsersMutations>(UsersMutations)
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('createAccount', () => {
        let output: CreateAccountOutput
        let input: CreateAccountInput

        beforeEach(async () => {
            input = {
                fullname: mockUser.fullname,
                phone: mockUser.phone,
                email: mockUser.email,
                password: mockUser.password,
                rePassword: mockUser.password,
                role: EDefaultRoles.admin,
            }
            output = await mutations.createAccount(input)
        })

        test('should call userService', () => {
            expect(service.createAccount).toBeCalledTimes(1)
            expect(service.createAccount).toBeCalledWith(input)
        })

        test('should return output object', () => {
            expect(output).toMatchObject({
                ok: true,
                accessToken: mockTokens.accessToken,
                user: {
                    ...mockUser,
                },
            })
        })
    })

    describe('updateAccount', () => {
        let output: UpdateAccountOutput
        let input: UpdateAccountInput
        let file: FileUpload | null

        beforeEach(async () => {
            input = {
                fullname: userUpdateStub().fullname,
                birthdate: userUpdateStub().birthdate,
                country: userUpdateStub().country,
                state: userUpdateStub().state,
                address: userUpdateStub().address,
                experience: userUpdateStub().experience,
                language: userUpdateStub().language,
                gender: userUpdateStub().gender,
            }

            output = await mutations.updateAccount(input, file, context)
        })

        test('should call userService', () => {
            expect(service.updateAccount).toBeCalledTimes(1)
            expect(service.updateAccount).toBeCalledWith(input, file, context)
        })

        test('should return user', () => {
            expect(output).toMatchObject({
                ok: true,
                user: {
                    ...mockUser,
                },
            })
        })
    })

    describe('deleteAccount', () => {
        let output: DeleteAccountOutput

        beforeEach(async () => {
            output = await mutations.deleteAccount(context)
        })

        test('should return true', () => {
            expect(output).toMatchObject({ ok: true })
        })
    })

    describe('changePassword', () => {
        let output: ChangeOutput
        let input: ChangePasswordInput

        beforeEach(async () => {
            input = {
                password: changePasswordStub.password,
                rePassword: changePasswordStub.rePassword,
            }

            output = await mutations.changePassword(input, context)
        })

        test('should return true', () => {
            expect(output).toMatchObject({ ok: true })
        })
    })

    describe('changeEmail', () => {
        let output: ChangeOutput
        let input: ChangeEmailInput

        beforeEach(async () => {
            input = {
                email: changeEmailStub.email,
                reEmail: changeEmailStub.reEmail,
            }

            output = await mutations.changeEmail(input, context)
        })

        test('should return true', () => {
            expect(output).toMatchObject({ ok: true })
        })
    })

    describe('changePhone', () => {
        let output: ChangeOutput
        let input: ChangePhoneInput

        beforeEach(async () => {
            input = {
                phone: changePhoneStub.phone,
            }

            output = await mutations.changePhone(input, context)
        })

        test('should return true', () => {
            expect(output).toMatchObject({ ok: true })
        })
    })
})
