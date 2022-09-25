import { CONTEXT } from '@nestjs/graphql'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EmailService } from 'src/email/email.service'
import { FilesService } from 'src/files/files.services'
import { LanguageService } from 'src/language/language.service'
import { RolesService } from 'src/roles/roles.service'
import { TokenService } from 'src/token/token.service'
import { VerificationsService } from 'src/verifications/verifications.service'
import { User } from '../entities'
import { UsersService } from '../users.service'
import { mockRepository } from '../__mocks__/users.repository'
import { MockRepository, UserStub } from './types'
import {
    mockVerificationService,
    mockEmailService,
    mockTokenService,
    mockFilesService,
    mockRoleService,
    mockLanguageService,
} from './users.mock'
import { systemUserStub } from './__stubs/user.stub'
import { ValidationException } from 'src/exceptions'

jest.mock('../users.service')

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
        const _module = await Test.createTestingModule({
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
        service = _module.get<UsersService>(UsersService)
        verificationService = _module.get<VerificationsService>(VerificationsService)
        emailService = _module.get<EmailService>(EmailService)
        tokenService = _module.get<TokenService>(TokenService)
        filesService = _module.get<FilesService>(FilesService)
        roleService = _module.get<RolesService>(RolesService)
        languageService = _module.get<LanguageService>(LanguageService)

        // Context
        context = _module.get(CONTEXT)

        // Repositories
        usersRepository = _module.get(getRepositoryToken(User))

        // jest.clearAllMocks()
    })

    // Test to defined UsersService -- service
    test('should be defined', () => {
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

    describe('_createSystemUser', () => {
        describe('when _createSystemUser is called', () => {
            // let output: boolean
            const mockSystemUser: UserStub = {
                email: systemUserStub().email,
                phone: systemUserStub().phone,
                fullname: systemUserStub().fullname,
                password: systemUserStub().password,
                verifiedEmail: systemUserStub().verifiedEmail,
                verifiedPhone: systemUserStub().verifiedPhone,
                language: systemUserStub().language,
            }

            // beforeEach(async () => {
            //     mockSystemUser = {
            //         email: systemUserStub().email,
            //         phone: systemUserStub().phone,
            //         fullname: systemUserStub().fullname,
            //         password: systemUserStub().password,
            //         verifiedEmail: systemUserStub().verifiedEmail,
            //         verifiedPhone: systemUserStub().verifiedPhone,
            //         language: systemUserStub().language,
            //     }
            //     output = await service._createSystemUser()
            // })

            test('then return true if exist user by email', async () => {
                usersRepository.findOne.mockReturnValue(mockSystemUser)
                expect(usersRepository.findOne({ where: { email: mockSystemUser.email } })).toEqual(mockSystemUser)
                const output = await service._createSystemUser()
                expect(output).toEqual(true)
            })

            test('then create system user if it not exists', async () => {
                usersRepository.findOne.mockResolvedValue(undefined)
                usersRepository.create.mockReturnValue(mockSystemUser)
                usersRepository.save.mockResolvedValue(mockSystemUser)

                const output = await service._createSystemUser()

                await expect(usersRepository.findOne({ where: { email: mockSystemUser.email } })).resolves.toEqual(
                    undefined,
                )
                expect(usersRepository.create).toHaveBeenCalled()
                expect(usersRepository.create).toHaveBeenCalledWith(mockSystemUser)

                expect(usersRepository.save).toHaveBeenCalled()
                expect(usersRepository.save).toHaveBeenCalledWith(mockSystemUser)

                expect(output).toEqual(true)
            })

            // test('then create system user if it not exists', async () => {
            //     usersRepository.findOne.mockReturnValue(undefined)
            //     usersRepository.create.mockReturnValue(mockSystemUser)
            //     usersRepository.save.mockResolvedValue(mockSystemUser)

            //     expect(usersRepository.findOne({ where: { email: mockSystemUser.email } })).toEqual(undefined)

            //     // await service._createSystemUser()

            //     expect(usersRepository.create).toHaveBeenCalled()
            //     expect(usersRepository.create).toHaveBeenCalledWith(mockSystemUser)

            //     expect(usersRepository.save).toHaveBeenCalled()
            //     expect(usersRepository.save).toHaveBeenCalledWith(mockSystemUser)
            // })

            test.todo('then return error if syste user is not created')
            test.todo('then set roles to system user')
        })
    })
})
