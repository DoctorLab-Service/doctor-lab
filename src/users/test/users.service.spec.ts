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
import { mockLanguageService, mockRepository, mockRolesService, mockTokenService } from '../__mocks__'
import { MockRepository, UserStub } from './types'
import { mockVerificationService, mockEmailService, mockFilesService } from './users.mock'
import { systemUserStub, userStub } from './__stubs/user.stub'
import { CreateAccountInput } from './../dtos/create-account.dto'
import { ValidationException } from './../../exceptions/validation.exception'

describe('UsersService', () => {
    const context: any = {}
    let service: UsersService
    let usersRepository: MockRepository<User>
    let verificationService: VerificationsService
    let emailService: EmailService
    let tokenService: TokenService
    let filesService: FilesService
    let roleService: RolesService
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
        verificationService = _module.get<VerificationsService>(VerificationsService)
        emailService = _module.get<EmailService>(EmailService)
        tokenService = _module.get<TokenService>(TokenService)
        filesService = _module.get<FilesService>(FilesService)
        roleService = _module.get<RolesService>(RolesService)
        languageService = _module.get(LanguageService)

        // Repositories
        usersRepository = _module.get(getRepositoryToken(User))

        jest.clearAllMocks()
    })

    // Test to defined UsersService -- service
    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    it.todo('updateAccount')
    it.todo('deleteAccount')
    it.todo('myAccount')
    it.todo('findById')
    it.todo('findByPhone')
    it.todo('findByEmail')
    it.todo('findAllUsers')
    it.todo('changeEmail')
    it.todo('changePassword')
    it.todo('changePhone')

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
        const mockUser: CreateAccountInput = {
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

        test('sould fail if email is exist and verified phone', async () => {
            const errorMessage = 'There is user with that email already'

            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValueOnce({ ...mockUser, verifiedPhone: true })

            expect.assertions(2)
            try {
                await service.createAccount(mockUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ email: errorMessage })
            }
        })

        test('sould fail if phone is exist and verified phone', async () => {
            const errorMessage = 'There is user with that phone already'

            languageService.setError.mockResolvedValue(errorMessage)
            usersRepository.findOne.mockResolvedValueOnce(undefined)
            usersRepository.findOne.mockResolvedValueOnce({ ...mockUser, verifiedPhone: true })

            expect.assertions(2)
            try {
                await service.createAccount(mockUser)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ phone: errorMessage })
            }
        })

        test('sould delete account if phone or email is exist and not verified phone', async () => {
            usersRepository.findOne.mockResolvedValue({ ...mockUser })

            expect.assertions(2)
            try {
                await service.createAccount(mockUser)
            } catch (error) {
                expect(usersRepository.delete).toBeCalledTimes(1)
                expect(usersRepository.delete).toBeCalledWith(mockUser.id)
            }
        })

        test('sould create user', async () => {
            usersRepository.create.mockReturnValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            const result = await service.createAccount(mockUser)
            console.log(result)

            expect(usersRepository.create).toBeCalledTimes(1)
            expect(usersRepository.create).toBeCalledWith(mockUser)

            expect(usersRepository.save).toBeCalledTimes(1)
            expect(usersRepository.save).toBeCalledWith(mockUser)

            expect(result.user).toBe(mockUser)
        })

        test.todo('sould fail if user is not created')
        test.todo('sould set default role')
        test.todo('sould send verification email link')
        test.todo('sould send verification phone code')
        test.todo('sould generate tokens')
        test.todo('sould create user and return user and token')
    })
})
