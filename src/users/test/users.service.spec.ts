import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EmailService } from 'src/email/email.service'
import { FilesService } from 'src/files/files.services'
import { LanguageService } from 'src/language/language.service'
import { ESystemsRoles, EDefaultRoles } from 'src/roles/roles.enums'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { VerificationsService } from 'src/verifications/verifications.service'
import { User } from '../entities'
import { UsersService } from '../users.service'
import { MockRepository, UserStub } from './types'
import { systemUserStub, userStub, userUpdateStub } from './__stubs/user.stub'
import { CreateAccountInput } from './../dtos/create-account.dto'
import { ValidationException } from './../../exceptions/validation.exception'
import { changeEmailStub, changePasswordStub, changePhoneStub } from './__stubs'
import { object } from 'src/common/helpers'
import { getCurrentUser } from '../helpers'
import { UpdateAccountInput } from './../dtos/update-account.dto'
import { createReadStream } from 'fs'
import { FileUpload } from 'graphql-upload'
import { GenerateTokens } from 'src/token/config/types'
import {
    ChangeEmailInput,
    ChangePasswordInput,
    FindByEmailInput,
    FindByIdInput,
    FindByPhoneInput,
    ChangePhoneInput,
} from '../dtos'
import { mockEmailService } from '../__mocks__/email.mock'
import { mockFilesService } from '../__mocks__/files.mock'
import { mockRolesService } from '../__mocks__/roles.mock'
import { mockRepository } from '../__mocks__/users.repository'
import { mockVerificationService } from '../__mocks__/verification.mock'
import { mockLanguageService } from 'src/language/__mocks__/languages.mock'
import { mockTokenService } from 'src/token/__mocks__/token.mock'
import { tokensStub } from 'src/token/test/__stubs'

describe('UsersService', () => {
    let context: any
    let mockUser: User

    let service: UsersService
    let usersRepository: MockRepository<User>
    let tokenService: TokenService
    let roleService: RolesService
    let emailService: jest.Mocked<EmailService>
    let filesService: jest.Mocked<FilesService>
    let verificationService: jest.Mocked<VerificationsService>
    let languageService: jest.Mocked<LanguageService>

    // Start before testing
    beforeEach(async () => {
        const _module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository(),
                },
                {
                    provide: VerificationsService,
                    useValue: mockVerificationService(),
                },
                {
                    provide: EmailService,
                    useValue: mockEmailService(),
                },
                {
                    provide: TokenService,
                    useValue: mockTokenService(),
                },
                {
                    provide: FilesService,
                    useValue: mockFilesService(),
                },
                {
                    provide: RolesService,
                    useValue: mockRolesService(),
                },
                {
                    provide: LanguageService,
                    useValue: mockLanguageService(),
                },
            ],
        }).compile()

        // Services
        service = _module.get<UsersService>(UsersService)
        tokenService = _module.get<TokenService>(TokenService)
        roleService = _module.get<RolesService>(RolesService)
        emailService = _module.get(EmailService)
        filesService = _module.get(FilesService)
        verificationService = _module.get(VerificationsService)
        languageService = _module.get(LanguageService)

        // Repositories
        usersRepository = _module.get(getRepositoryToken(User))

        // Globals mocked
        mockUser = { ...userStub() }
        context = {
            req: {
                user: { ...userStub() },
            },
        }
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    // Test to defined UsersService -- service
    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('_createSystemUser', () => {
        const mockSystemUser: UserStub = {
            email: systemUserStub().email,
            phone: systemUserStub().phone,
            fullname: systemUserStub().fullname,
            password: systemUserStub().password,
            verifiedEmail: systemUserStub().verifiedEmail,
            verifiedPhone: systemUserStub().verifiedPhone,
            language: systemUserStub().language,
        }

        test('sould return true if exist user by email', async () => {
            usersRepository.findOne.mockReturnValue(mockSystemUser)
            expect(usersRepository.findOne({ where: { email: mockSystemUser.email } })).toEqual(mockSystemUser)
            const output = await service._createSystemUser()
            expect(output).toEqual(true)
        })

        test('sould create system user if it not exists', async () => {
            usersRepository.findOne.mockReturnValue(undefined)
            usersRepository.create.mockReturnValue(mockSystemUser)
            usersRepository.save.mockResolvedValue(mockSystemUser)

            const output = await service._createSystemUser()
            expect(usersRepository.findOne({ where: { email: mockSystemUser.email } })).toEqual(undefined)
            expect(usersRepository.create).toHaveBeenCalled()
            expect(usersRepository.create).toHaveBeenCalledWith(mockSystemUser)

            expect(usersRepository.save).toHaveBeenCalled()
            expect(usersRepository.save).toHaveBeenCalledWith(mockSystemUser)

            expect(output).toEqual(true)
        })

        test('sould set roles to system user', async () => {
            await roleService.setUserRole(
                {
                    role: ESystemsRoles.super_admin,
                    userId: 1,
                },
                true,
            )
            await roleService.setUserRole(
                {
                    role: EDefaultRoles.admin,
                    userId: 1,
                },
                true,
            )

            expect(roleService.setUserRole).toBeCalledTimes(2)
            expect(roleService.setUserRole).toBeCalledWith(
                {
                    role: ESystemsRoles.super_admin,
                    userId: 1,
                },
                true,
            )
            expect(roleService.setUserRole).toBeCalledWith(
                {
                    role: EDefaultRoles.admin,
                    userId: 1,
                },
                true,
            )
        })

        test('sould return error if system user is not created', async () => {
            const errorMessage = "Couldn't create system account"

            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service._createSystemUser()
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toEqual(errorMessage)
            }
        })
    })

    describe('createAccount', () => {
        let mockCreateUser: CreateAccountInput
        let mockTokens: GenerateTokens

        beforeEach(async () => {
            mockCreateUser = {
                phone: userStub().phone,
                email: userStub().email,
                fullname: userStub().fullname,
                verifiedEmail: userStub().verifiedEmail,
                verifiedPhone: userStub().verifiedPhone,
                language: userStub().language,
                password: userStub().password,
                rePassword: 'dl.password',
                role: EDefaultRoles.admin,
            }
            mockTokens = { ...tokensStub() }
        })

        test('sould fail if email is exist and verified phone', async () => {
            const errorMessage = 'There is user with that email already'

            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValueOnce({ ...mockCreateUser, verifiedPhone: true })

            expect.assertions(2)
            try {
                await service.createAccount(mockCreateUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ email: errorMessage })
            }
        })

        test('sould fail if phone is exist and verified phone', async () => {
            const errorMessage = 'There is user with that phone already'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValueOnce(undefined)
            usersRepository.findOne.mockResolvedValueOnce({ ...mockCreateUser, verifiedPhone: true })

            expect.assertions(2)
            try {
                await service.createAccount(mockCreateUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ phone: errorMessage })
            }
        })

        test('sould delete account if phone or email is exist and not verified phone', async () => {
            usersRepository.findOne.mockResolvedValue({ ...mockCreateUser })

            expect.assertions(2)
            try {
                await service.createAccount(mockCreateUser)
            } catch (error) {
                expect(usersRepository.delete).toBeCalledTimes(1)
                expect(usersRepository.delete).toBeCalledWith(mockCreateUser.id)
            }
        })

        test('sould create account and return output object', async () => {
            usersRepository.create.mockReturnValue(mockCreateUser)
            usersRepository.save.mockResolvedValue(mockUser)

            const result = await service.createAccount(mockCreateUser)

            expect(usersRepository.create).toBeCalledTimes(1)
            expect(usersRepository.create).toBeCalledWith({
                ...object.withoutProperties(mockCreateUser, ['rePassword', 'role']),
            })

            expect(usersRepository.save).toBeCalledTimes(1)
            expect(usersRepository.save).toBeCalledWith(mockCreateUser)

            expect(result).toMatchObject({
                ok: true,
                ...mockTokens,
                user: {
                    ...mockUser,
                },
            })
        })

        test('sould fail if account is not created', async () => {
            const errorMessage = "Couldn't create account"
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.createAccount(mockCreateUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ create: errorMessage })
            }
        })

        test('sould set default role', async () => {
            await roleService.setUserRole(
                {
                    role: EDefaultRoles.admin,
                    userId: 1,
                },
                true,
            )

            expect(roleService.setUserRole).toBeCalledTimes(1)
            expect(roleService.setUserRole).toBeCalledWith(
                {
                    role: EDefaultRoles.admin,
                    userId: 1,
                },
                true,
            )
        })

        test('sould send verification email link', async () => {
            verificationService.verificationEmailCode(mockUser)

            expect(verificationService.verificationEmailCode).toBeCalledTimes(1)
            expect(verificationService.verificationEmailCode).toBeCalledWith(mockUser)
        })

        test('sould send verification phone code', async () => {
            verificationService.verificationPhoneCode(mockUser)

            expect(verificationService.verificationPhoneCode).toBeCalledTimes(1)
            expect(verificationService.verificationPhoneCode).toBeCalledWith(mockUser)
        })

        test('sould generate tokens', async () => {
            const tokens = tokenService.generateTokens({ id: mockUser.id })

            expect(tokenService.generateTokens).toBeCalledTimes(1)
            expect(tokenService.generateTokens).toBeCalledWith({ id: mockUser.id })

            expect(tokens).toEqual(mockTokens)
        })

        test('sould save tokens', async () => {
            tokenService.saveTokens(mockUser.id, mockTokens)

            expect(tokenService.saveTokens).toBeCalledTimes(1)
            expect(tokenService.saveTokens).toBeCalledWith(mockUser.id, mockTokens)
        })

        test('sould fail if tokens is not generated', async () => {
            const errorMessage = "Couldn't create token, try to login"
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.createAccount(mockCreateUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ create: errorMessage })
            }
        })
    })

    describe('updateAccount', () => {
        let mockUpdateUser: UpdateAccountInput
        let mockFile: FileUpload | null

        beforeEach(async () => {
            mockFile = null
            mockUpdateUser = {
                ...object.withoutProperties(userStub(), ['password']),
                fullname: userUpdateStub().fullname,
                birthdate: userUpdateStub().birthdate,
                country: userUpdateStub().country,
                state: userUpdateStub().state,
                address: userUpdateStub().address,
                experience: userUpdateStub().experience,
                language: userUpdateStub().language,
            }
        })

        test('should get current user from context', async () => {
            const currentUser = getCurrentUser(context)
            expect(currentUser).toEqual(mockUser)
        })

        test('should fail if user is not exist', async () => {
            const errorMessage = "Couldn't update account"
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(null)

            expect.assertions(2)
            try {
                await service.updateAccount(mockUpdateUser, mockFile, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_exists: errorMessage })
            }
        })

        test('should upload avatat if file exist', async () => {
            mockFile = {
                filename: 'some_picture.png',
                mimetype: 'image/png',
                encoding: '7bit',
                createReadStream: createReadStream,
            }
            filesService.uploadFiles.mockResolvedValue({ paths: ['some image link from cloudinary'] })

            await filesService.uploadFiles(mockFile, {
                userId: mockUser.id,
                key: 'avatar',
            })

            expect(filesService.uploadFiles).toBeCalledTimes(1)
            expect(filesService.uploadFiles).toBeCalledWith(mockFile, {
                userId: mockUser.id,
                key: 'avatar',
            })
        })

        test('should fail if avatart is not uploaded', async () => {
            const errorMessage = 'Failed to upload file(s)'
            mockFile = {
                filename: 'some_picture.png',
                mimetype: 'image/png',
                encoding: '7bit',
                createReadStream: createReadStream,
            }
            languageService.setError.mockResolvedValue(errorMessage)
            filesService.uploadFiles.mockResolvedValue({ paths: [] })

            try {
                await service.updateAccount(mockUpdateUser, mockFile, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_exists: errorMessage })
            }
        })

        test('should update account', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            const updatedUser = await service.updateAccount(mockUpdateUser, mockFile, context)

            expect(usersRepository.save).toBeCalledTimes(1)
            expect(usersRepository.save).toBeCalledWith(mockUpdateUser)

            expect(updatedUser).toMatchObject({
                ok: true,
                user: {
                    ...mockUser,
                },
            })
        })

        test('should fail if not updated account', async () => {
            const errorMessage = "Couldn't update account"
            languageService.setError.mockResolvedValue(errorMessage)

            try {
                await service.updateAccount(mockUpdateUser, mockFile, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_exists: errorMessage })
            }
        })
    })

    describe('deleteAccount', () => {
        test('should get current user from context', async () => {
            const currentUser = getCurrentUser(context)
            expect(currentUser).toEqual(mockUser)
        })

        test("should delete user's files", async () => {
            await service.deleteAccount(context)

            expect(filesService.deleteFiles).toBeCalledTimes(1)
            expect(filesService.deleteFiles).toBeCalledWith(mockUser.id)
        })

        test('should delete account', async () => {
            await service.deleteAccount(context)

            expect(usersRepository.delete).toBeCalledTimes(1)
            expect(usersRepository.delete).toBeCalledWith(mockUser.id)
        })

        test('should fail if not delete account', async () => {
            const errorMessage = "Couldn't deleted account"
            languageService.setError.mockResolvedValue(errorMessage)

            try {
                await service.deleteAccount(context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ delete: errorMessage })
            }
        })
    })

    describe('myAccount', () => {
        test('should get current user from context', async () => {
            const currentUser = getCurrentUser(context)
            expect(currentUser).toEqual(mockUser)
        })

        test('should return user', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            const user = await service.myAccount(context)
            expect(user).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })
        test('should fail if user is not found', async () => {
            const errorMessage = 'User is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.myAccount(context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_found: errorMessage })
            }
        })
    })

    describe('findById', () => {
        let mockFindUser: FindByIdInput

        beforeEach(async () => {
            mockFindUser = { id: mockUser.id }
        })

        test('should return user by id', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            const user = await service.findById(mockFindUser)
            expect(user).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })

        test('should fail if not found user', async () => {
            const errorMessage = 'The user is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.findById(mockFindUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_found: errorMessage })
            }
        })
    })

    describe('findByPhone', () => {
        let mockFindUser: FindByPhoneInput

        beforeEach(async () => {
            mockFindUser = { phone: mockUser.phone }
        })

        test('should return user by phone', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            const user = await service.findByPhone(mockFindUser)
            expect(user).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })

        test('should fail if not found user', async () => {
            const errorMessage = 'The user is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.findByPhone(mockFindUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_found: errorMessage })
            }
        })
    })

    describe('findByEmail', () => {
        let mockFindUser: FindByEmailInput

        beforeEach(async () => {
            mockFindUser = { email: mockUser.email }
        })

        test('should return user by email', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            const user = await service.findByEmail(mockFindUser)
            expect(user).toMatchObject({
                ok: true,
                user: mockUser,
            })
        })

        test('should fail if not found user', async () => {
            const errorMessage = 'The user is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.findByEmail(mockFindUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_found: errorMessage })
            }
        })
    })

    describe('findAllUsers', () => {
        test('should return all users', async () => {
            usersRepository.find.mockResolvedValue([mockUser])
            const users = await service.findAllUsers()
            expect(users).toMatchObject({
                ok: true,
                users: [mockUser],
            })
        })

        test('should fail if not found user', async () => {
            const errorMessage = 'The user is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.find.mockResolvedValue([])

            try {
                await service.findAllUsers()
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_found: errorMessage })
            }
        })
    })

    describe('changePassword', () => {
        let mockChangePassword: ChangePasswordInput

        beforeEach(async () => {
            mockChangePassword = { ...changePasswordStub }
        })

        test('should get current user from context', async () => {
            const currentUser = getCurrentUser(context)
            expect(currentUser).toEqual(mockUser)
        })

        test('should exist user', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue(mockUser)

            await service.changePassword(mockChangePassword, context)
        })

        test('should fail if user is not exist', async () => {
            const errorMessage = 'User is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.changePassword(mockChangePassword, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_exists: errorMessage })
            }
        })

        test('should update user', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue(mockUser)

            const updatedUser = await service.changePassword(mockChangePassword, context)

            expect(usersRepository.save).toBeCalledTimes(1)
            expect(usersRepository.save).toBeCalledWith({ ...mockUser, password: mockChangePassword.password })

            expect(updatedUser).toMatchObject({
                ok: true,
            })
        })

        test('should fail if not updated user', async () => {
            const errorMessage = 'Unable to change password'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(mockUser)
            usersRepository.save.mockResolvedValue(undefined)

            try {
                await service.changePassword(mockChangePassword, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ change: errorMessage })
            }
        })

        test('should send email info', async () => {
            emailService.sendChangeInfo.mockResolvedValue(true)

            emailService.sendChangeInfo('password', {
                to: mockUser.email,
                fullname: mockUser.fullname,
                changedData: mockChangePassword.password,
            })

            expect(emailService.sendChangeInfo).toBeCalledTimes(1)
            expect(emailService.sendChangeInfo).toBeCalledWith('password', {
                to: mockUser.email,
                fullname: mockUser.fullname,
                changedData: mockChangePassword.password,
            })
        })

        test('should fail if not send email', async () => {
            const errorMessage = 'Unable to send you email'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            try {
                await service.changePassword(mockChangePassword, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ no_send: errorMessage })
            }
        })

        test('should remove token', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue(mockUser)

            await service.changePassword(mockChangePassword, context)

            expect(tokenService.removeTokenByUserId).toBeCalledTimes(1)
            expect(tokenService.removeTokenByUserId).toBeCalledWith(mockUser.id)
        })

        test('should change password', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue(mockUser)

            const changePassword = await service.changePassword(mockChangePassword, context)

            expect(changePassword).toMatchObject({ ok: true })
        })
    })

    describe('changeEmail', () => {
        let mockChangeEmail: ChangeEmailInput

        beforeEach(async () => {
            mockChangeEmail = { ...changeEmailStub }
        })

        test('should get current user from context', async () => {
            usersRepository.save.mockResolvedValue(mockUser)

            const currentUser = getCurrentUser(context)
            expect(currentUser).toEqual(mockUser)
        })

        test('should exist user', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue(mockUser)
            await service.changeEmail(mockChangeEmail, context)
        })

        test('should fail if user is not exist', async () => {
            const errorMessage = 'User is not found'
            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.changeEmail(mockChangeEmail, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_exists: errorMessage })
            }
        })

        test('should update user', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue(mockUser)

            const updatedUser = await service.changeEmail(mockChangeEmail, context)

            expect(usersRepository.save).toBeCalledTimes(1)
            expect(usersRepository.save).toBeCalledWith({
                ...object.withoutProperties(mockUser, ['password']),
                email: mockChangeEmail.email,
            })

            expect(updatedUser).toMatchObject({
                ok: true,
            })
        })

        test('should fail if not updated user', async () => {
            const errorMessage = 'Unable to change password'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(mockUser)
            usersRepository.save.mockResolvedValue(undefined)

            try {
                await service.changeEmail(mockChangeEmail, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ change: errorMessage })
            }
        })

        test('should send email info', async () => {
            emailService.sendChangeInfo.mockResolvedValue(true)

            emailService.sendChangeInfo('password', {
                to: mockUser.email,
                fullname: mockUser.fullname,
                changedData: mockChangeEmail.email,
            })

            expect(emailService.sendChangeInfo).toBeCalledTimes(1)
            expect(emailService.sendChangeInfo).toBeCalledWith('password', {
                to: mockUser.email,
                fullname: mockUser.fullname,
                changedData: mockChangeEmail.email,
            })
        })

        test('should fail if not send email', async () => {
            const errorMessage = 'Unable to send you email'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            try {
                await service.changeEmail(mockChangeEmail, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ no_send: errorMessage })
            }
        })

        test('should change email', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            const changePassword = await service.changeEmail(mockChangeEmail, context)

            expect(changePassword).toMatchObject({ ok: true })
        })
    })

    describe('changePhone', () => {
        let mockChangePhone: ChangePhoneInput

        beforeEach(async () => {
            mockChangePhone = { ...changePhoneStub }
        })

        test('should get current user from context', async () => {
            usersRepository.save.mockResolvedValue(mockUser)

            const currentUser = getCurrentUser(context)
            expect(currentUser).toEqual(mockUser)
        })

        test('should exist user', async () => {
            usersRepository.save.mockResolvedValue(mockUser)
            usersRepository.findOne.mockResolvedValue({ ...mockUser, verifiedEmail: true })
            await service.changePhone(mockChangePhone, context)
        })

        test('should fail if user is not exist', async () => {
            const errorMessage = 'User is not found'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(null)

            try {
                await service.changePhone(mockChangePhone, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ not_exists: errorMessage })
            }
        })

        test('shoud fail if not verified email', async () => {
            const errorMessage = 'Email is not verified'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue(mockUser)

            try {
                await service.changePhone(mockChangePhone, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ verify: errorMessage })
            }
        })

        test('should update user', async () => {
            usersRepository.findOne.mockResolvedValue({ ...mockUser, verifiedEmail: true })
            usersRepository.save.mockResolvedValue({ ...mockUser, ...mockChangePhone })

            const updatedUser = await service.changePhone(mockChangePhone, context)

            expect(usersRepository.save).toBeCalledTimes(1)
            expect(usersRepository.save).toBeCalledWith({
                ...object.withoutProperties({ ...mockUser, verifiedEmail: true }, ['password']),
                phone: mockChangePhone.phone,
            })

            expect(updatedUser).toMatchObject({
                ok: true,
            })
        })

        test('should fail if not updated user', async () => {
            const errorMessage = 'Unable to change password'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue({ ...mockUser, verifiedEmail: true })
            usersRepository.save.mockResolvedValue(undefined)

            try {
                await service.changePhone(mockChangePhone, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ change: errorMessage })
            }
        })

        test('should send email info', async () => {
            emailService.sendChangeInfo.mockResolvedValue(true)

            emailService.sendChangeInfo('password', {
                to: mockUser.email,
                fullname: mockUser.fullname,
                changedData: mockChangePhone.phone,
            })

            expect(emailService.sendChangeInfo).toBeCalledTimes(1)
            expect(emailService.sendChangeInfo).toBeCalledWith('password', {
                to: mockUser.email,
                fullname: mockUser.fullname,
                changedData: mockChangePhone.phone,
            })
        })

        test('should fail if not send email', async () => {
            const errorMessage = 'Unable to send you email'
            languageService.setError.mockResolvedValue(errorMessage)

            usersRepository.findOne.mockResolvedValue({ ...mockUser, verifiedEmail: true })
            usersRepository.save.mockResolvedValue(mockUser)

            try {
                await service.changePhone(mockChangePhone, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ no_send: errorMessage })
            }
        })

        test('should change email', async () => {
            usersRepository.save.mockResolvedValue({ ...mockUser, ...mockChangePhone })
            usersRepository.findOne.mockResolvedValue({ ...mockUser, verifiedEmail: true })

            const changePassword = await service.changePhone(mockChangePhone, context)

            expect(changePassword).toMatchObject({ ok: true })
        })
    })
})
