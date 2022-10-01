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
import { mockLanguageService, mockRepository, mockRolesService } from '../__mocks__'
import { MockRepository, UserStub } from './types'
import { mockVerificationService, mockEmailService, mockTokenService, mockFilesService } from './users.mock'
import { systemUserStub, userStub } from './__stubs/user.stub'
import { CreateAccountInput } from './../dtos/create-account.dto'
import { ValidationException } from 'src/exceptions'

describe('UsersService', () => {
    const context: any = {}
    let service: UsersService
    let usersRepository: MockRepository<User>
    let verificationService: VerificationsService
    let emailService: EmailService
    let tokenService: TokenService
    let filesService: FilesService
    let roleService: RolesService
    let languageService: LanguageService

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
        languageService = _module.get<LanguageService>(LanguageService)

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
            usersRepository.findOne.mockReturnValue(mockSystemUser)
            expect(usersRepository.findOne({ where: { email: mockSystemUser.email } })).toEqual(mockSystemUser)
            const output = await service._createSystemUser()

            // Add system role for created user
            const superAdminRole = await roleService.setUserRole(
                {
                    role: ESystemsRoles.super_admin,
                    userId: 1,
                },
                true,
            )

            const adminRole = await roleService.setUserRole(
                {
                    role: EDefaultRoles.admin,
                    userId: 1,
                },
                true,
            )

            expect(superAdminRole.role.roleKey).toEqual(ESystemsRoles.super_admin)
            expect(adminRole.role.roleKey).toEqual(EDefaultRoles.admin)
            expect(output).toEqual(true)
        })

        test('sould return error if system user is not created', async () => {
            expect.assertions(2)
            try {
                await service._createSystemUser()
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Couldn't create system account")
            }
        })
    })

    describe('createAccount', () => {
        const mockUser: CreateAccountInput = {
            email: userStub().email,
            phone: userStub().phone,
            fullname: userStub().fullname,
            verifiedEmail: userStub().verifiedEmail,
            verifiedPhone: userStub().verifiedPhone,
            language: userStub().language,
            password: userStub().password,
            rePassword: 'dl.password',
            role: EDefaultRoles.admin,
        }

        test('sould fail if email is exist and verified phone', async () => {
            usersRepository.findOne.mockReturnValue(mockUser)
            expect(usersRepository.findOne({ where: { email: mockUser.email } })).toEqual(mockUser)

            expect.assertions(2)
            try {
                const user = usersRepository.findOne({ where: { email: mockUser.email } })
                expect(!user.verifiedPhone).toEqual(true)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                console.log(error)
                expect(error).toHaveProperty('messages', { email: 'There is user with that email already1' }) // have to  have
                // expect(error.messages).toHaveProperty({ create: "Couldn't create system account" }) // have
                // expect(error.message).toBe('There is user with that email already')
            }
        })
        test.todo('sould fail if phone is exist and verified phone')
        test.todo('sould delete account if email is exist and not verified phone')
        test.todo('sould delete account if phone is exist and not verified phone')
        test.todo('sould create user')
        test.todo('sould fail if user is not created')
        test.todo('sould set default role')
        test.todo('sould send verification email link')
        test.todo('sould send verification phone code')
        test.todo('sould generate tokens')
        test.todo('sould create user and return user and token')
    })
})
