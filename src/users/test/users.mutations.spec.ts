import { Test } from '@nestjs/testing'
import { FileUpload } from 'graphql-upload'
import { EDefaultRoles } from 'src/roles/roles.enums'
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
import { UsersMutations } from '../resolvers/users.mutations'
import { UsersService } from '../users.service'
import {
    userStub,
    accessTokenStub,
    userUpdateStub,
    changePasswordStub,
    changeEmailStub,
    changePhoneStub,
} from './__stubs'

jest.mock('../users.service')

describe('UserMutations', () => {
    const context: any = {}
    let usersService: UsersService
    let usersMutations: UsersMutations

    beforeEach(async () => {
        const _module = await Test.createTestingModule({
            providers: [UsersService, UsersMutations],
        }).compile()

        usersService = _module.get<UsersService>(UsersService)
        usersMutations = _module.get<UsersMutations>(UsersMutations)

        jest.clearAllMocks()
    })

    describe('createAccount', () => {
        describe('when createAccount is called', () => {
            let output: CreateAccountOutput
            let input: CreateAccountInput
            beforeEach(async () => {
                input = {
                    fullname: userStub().fullname,
                    phone: userStub().phone,
                    email: userStub().email,
                    password: userStub().password,
                    rePassword: userStub().password,
                    role: EDefaultRoles.admin,
                }
                output = await usersMutations.createAccount(input)
            })

            test('then it should call userService', () => {
                expect(usersService.createAccount).toBeCalledTimes(1)
                expect(usersService.createAccount).toBeCalledWith(input)
            })

            test('then it should return user', () => {
                expect(output.user).toEqual(userStub())
            })

            test('then it should return token', () => {
                expect(output.accessToken).toEqual(accessTokenStub)
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('updateAccount', () => {
        describe('when createAccount is called', () => {
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

                output = await usersMutations.updateAccount(input, file, context)
            })

            test('then it should call userService', () => {
                expect(usersService.updateAccount).toBeCalledTimes(1)
                expect(usersService.updateAccount).toBeCalledWith(input, file, context)
            })

            test('then it should return user', () => {
                expect(output.user).toEqual(userStub())
            })
            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('deleteAccount', () => {
        describe('when deleteAccount is called', () => {
            let output: DeleteAccountOutput

            beforeEach(async () => {
                output = await usersMutations.deleteAccount(context)
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('changePassword', () => {
        describe('when changePassword is called', () => {
            let output: ChangeOutput
            let input: ChangePasswordInput

            beforeEach(async () => {
                input = {
                    password: changePasswordStub.password,
                    rePassword: changePasswordStub.rePassword,
                }

                output = await usersMutations.changePassword(input, context)
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('changeEmail', () => {
        describe('when changeEmail is called', () => {
            let output: ChangeOutput
            let input: ChangeEmailInput

            beforeEach(async () => {
                input = {
                    email: changeEmailStub.email,
                    reEmail: changeEmailStub.reEmail,
                }

                output = await usersMutations.changeEmail(input, context)
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })

    describe('changePhone', () => {
        describe('when changePhone is called', () => {
            let output: ChangeOutput
            let input: ChangePhoneInput

            beforeEach(async () => {
                input = {
                    phone: changePhoneStub.phone,
                }

                output = await usersMutations.changePhone(input, context)
            })

            test('then it should return true', () => {
                expect(output.ok).toEqual(true)
            })
        })
    })
})
