import { CONTEXT } from "@nestjs/graphql"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { EmailService } from "src/email/email.service"
import { FilesService } from "src/files/files.services"
import { LanguageService } from "src/language/language.service"
import { ESystemsRoles, EDefaultRoles } from "src/roles/roles.enums"
import { RolesService } from "src/roles/roles.service"
import { TokenService } from "src/token/token.service"
import { VerificationsService } from "src/verifications/verifications.service"
import { systemUserParams } from "../config/users.config"
import { User } from "../entities"
import { UsersService } from "../users.service"
import { mockRepository } from "../__mocks__/users.repository"
import { MockRepository } from "./types"
import { mockVerificationService, mockEmailService, mockTokenService, mockFilesService, mockRoleService, mockLanguageService } from "./users.mock"

describe('UsersService', () => {
    let service: UsersService
    let usersRepository: MockRepository<User>
    let verificationService: VerificationsService
    let emailService: EmailService
    let tokenService: TokenService
    let filesService: FilesService
    let roleService: RolesService
    let languageService: LanguageService
    let context: 'REQUEST'

    // Start before testing
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: CONTEXT,
                    useValue: {},
                },
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
                    useValue: mockRoleService(),
                },
                {
                    provide: LanguageService,
                    useValue: mockLanguageService(),
                },
            ],
        }).compile()

        // Services
        service = module.get<UsersService>(UsersService)
        verificationService = module.get<VerificationsService>(VerificationsService)
        emailService = module.get<EmailService>(EmailService)
        tokenService = module.get<TokenService>(TokenService)
        filesService = module.get<FilesService>(FilesService)
        roleService = module.get<RolesService>(RolesService)
        languageService = module.get<LanguageService>(LanguageService)

        // Context
        context = module.get(CONTEXT)

        // Repositories
        usersRepository = module.get(getRepositoryToken(User))
    })

    // Test to defined UsersService -- service
    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it.todo('createAccount')
    it.todo('deleteAccount')
    it.todo('myAccount')
    it.todo('findById')
    it.todo('findByPhone')
    it.todo('findByEmail')
    it.todo('findAllUsers')
    it.todo('changeEmail')
    it.todo('changePassword')
    it.todo('changePhone')

    // Test Module to create system user
    describe('_createSystemUser', () => {
        const mockUser = systemUserParams

        // Test exist to system user
        it('should return true if system user exists', async () => {
            usersRepository.findOne.mockResolvedValue(mockUser)
            const output = await service._createSystemUser()
            expect(output).toBe(true)
        })

        // Test to create system user
        it('should create system user if it not exists', async () => {
            usersRepository.findOne.mockResolvedValue(undefined)

            // Create System User
            usersRepository.create.mockReturnValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            const output = await service._createSystemUser()

            expect(usersRepository.create).toHaveBeenCalledTimes(1)
            expect(usersRepository.create).toHaveBeenCalledWith(mockUser)

            expect(usersRepository.save).toHaveBeenCalledTimes(1)
            expect(usersRepository.save).toHaveBeenCalledWith(mockUser)

            expect(output).toBe(true)
        })

        // Test to if not created system user
        it('should be fail if not created system user', async () => {
            usersRepository.findOne.mockResolvedValue(undefined)

            // Create System User
            usersRepository.create.mockReturnValue(mockUser)
            usersRepository.save.mockResolvedValue(mockUser)

            const output = await service._createSystemUser()

            expect(usersRepository.create).toHaveBeenCalledTimes(1)
            expect(usersRepository.create).toHaveBeenCalledWith(mockUser)

            expect(usersRepository.save).toHaveBeenCalledTimes(1)
            expect(usersRepository.save).toHaveBeenCalledWith(mockUser)

            expect(!output).toBe(false)
        })

        // Set role to existing sistem role
        it('should set system user roles', async () => {
            usersRepository.findOne.mockResolvedValue({
                id: 1,
                email: 'dl.service@email.com',
                phone: '+380979995500',
            })

            // Add system role for created user
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
        })
    })

    // Test Module to create account
    describe('createAccount', () => {
        const mockUser = {
            fullname: 'dl_user',
            phone: '+380979995500',
            email: 'dl.service@email.com',
            password: 'dl.password',
            rePassword: 'dl.password',
            verifiedPhone: false,
            role: EDefaultRoles.admin,
        }

        it('should create new account', async () => {
            usersRepository.create.mockReturnValue(mockUser)
            usersRepository.save.mockReturnValue(mockUser)
            const output = await service.createAccount(mockUser)

            expect(output.user).toEqual(mockUser)

            expect(usersRepository.create).toHaveBeenCalledTimes(1)
            expect(usersRepository.create).toHaveBeenCalledWith(mockUser)

            expect(usersRepository.save).toHaveBeenCalledTimes(1)
            expect(usersRepository.save).toHaveBeenCalledWith(mockUser)
        })
        it('should fail if user email is existing and verifiedPhone', async () => {
            // usersRepository.findOne.mockReturnValue(mockUser)
            // usersRepository.create.mockReturnValue(mockUser)
            // usersRepository.save.mockResolvedValue(mockUser)

            // expect(usersRepository.findOne({ where: { email: mockUser.email } })).toEqual(mockUser)

            // await expect(service.createAccount(mockUser)).rejects.toThrow()
            // expect(usersRepository.create).toHaveBeenCalledTimes(1)
            // expect(usersRepository.create).toHaveBeenCalledWith(mockUser)

            // expect(usersRepository.save).toHaveBeenCalledTimes(1)
            // expect(usersRepository.save).toHaveBeenCalledWith(mockUser)
        })
        it.todo('should fail if user phone is existing and verifiedPhone')
        it.todo('should delete by id if user email and not verifiedPhone ')
        it.todo('should delete by id if user phone and not verifiedPhone ')
        it.todo('should crate if not verifiedPhone')
        it.todo('should fail if created account is fail')
        it.todo('should set role to created account is fail')
        it.todo('should send verify email')
        it.todo('should send verify phone')
        it.todo('should generate tokens')
        it.todo('should save tokens in database')
        it.todo('should fail to generate tokens is fail')
    })
})
