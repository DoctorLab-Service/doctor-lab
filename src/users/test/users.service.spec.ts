import { forwardRef } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { EmailModule } from 'src/email/email.module'
import { EmailService } from 'src/email/email.service'
import { FilesModule } from 'src/files/files.module'
import { FilesService } from 'src/files/files.services'
import { LanguageModule } from 'src/language/language.module'
import { LanguageService } from 'src/language/language.service'
import { PhoneModule } from 'src/phone/phone.module'
import { UserRoles } from 'src/roles/entities'
import { RolesModule } from 'src/roles/roles.module'
import { RolesService } from 'src/roles/roles.service'
import { TokenModule } from 'src/token/token.module'
import { TokenService } from 'src/token/token.service'
import { VerificationEmail, VerificationPhone } from 'src/verifications/entities'
import { VerificationsModule } from 'src/verifications/verifications.module'
import { VerificationsService } from 'src/verifications/verifications.service'
import { User } from '../entities'
import { UsersService } from '../users.service'
import { MockRepository } from './types'
import {
    mockRepository,
    mockVerificationService,
    mockEmailService,
    mockTokenService,
    mockFilesService,
    mockRoleService,
    mockLanguageService,
} from './users.mock'

describe.only('UsersService', () => {
    let service: UsersService
    let usersRepository: MockRepository<User>
    // let verificationService: VerificationsService
    // let emailService: EmailService
    // let tokenService: TokenService
    // let filesService: FilesService
    // let roleService: RolesService
    // let languageService: LanguageService

    // Start before testing
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([User, UserRoles, VerificationEmail, VerificationPhone]),
                // forwardRef(() => TokenModule),
                // forwardRef(() => RolesModule),
                FilesModule,
                EmailModule,
                PhoneModule,
                LanguageModule,
                RolesModule,
                VerificationsModule,
            ],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository(),
                },
                // {
                //     provide: VerificationsService,
                //     useValue: mockVerificationService(),
                // },
                // {
                //     provide: EmailService,
                //     useValue: mockEmailService(),
                // },
                // {
                //     provide: TokenService,
                //     useValue: mockTokenService(),
                // },
                // {
                //     provide: FilesService,
                //     useValue: mockFilesService(),
                // },
                // {
                //     provide: RolesService,
                //     useValue: mockRoleService(),
                // },
                // {
                //     provide: LanguageService,
                //     useValue: mockLanguageService(),
                // },
            ],
        }).compile()

        console.log('Module', module)

        // Services
        service = module.get<UsersService>(UsersService)
        // verificationService = module.get<VerificationsService>(VerificationsService)
        // emailService = module.get<EmailService>(EmailService)
        // tokenService = module.get<TokenService>(TokenService)
        // filesService = module.get<FilesService>(FilesService)
        // roleService = module.get<RolesService>(RolesService)
        // languageService = module.get<LanguageService>(LanguageService)

        // Repositories
        usersRepository = module.get(getRepositoryToken(User))
    })

    // Test to defined UsersService -- service
    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    // Set todo for testing users.service
    it.todo('_createSystemUser')
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

    // Test group to create system user
    describe('_createSystemUser', () => {
        const createSystemUserArgs = {
            email: 'dl.service@email.com',
            phone: '+380979995500',
            fullname: 'dl.user_name',
            password: 'dl.password',
            verifiedEmail: true,
            verifiedPhone: true,
        }

        // Test exist to system user
        it('should if exist system user', async () => {
            usersRepository.findOne.mockResolvedValue({
                id: 1,
                email: 'dl.service@email.com',
                phone: '+380979995500',
            })

            const result = await service._createSystemUser()
            // expect(result).toBe(true)
        })

        // // Test to create system user
        // it('should create system user if it not exists', async () => {
        //     usersRepository.findOne.mockResolvedValue(undefined)

        //     // Create System User
        //     usersRepository.create.mockReturnValue(createSystemUserArgs)
        //     usersRepository.save.mockResolvedValue(createSystemUserArgs)

        //     const result = await service._createSystemUser()

        //     expect(usersRepository.create).toHaveBeenCalledTimes(1)
        //     expect(usersRepository.create).toHaveBeenCalledWith(createSystemUserArgs)

        //     expect(usersRepository.save).toHaveBeenCalledTimes(1)
        //     expect(usersRepository.save).toHaveBeenCalledWith(createSystemUserArgs)

        //     expect(result).toBe(true)
        // })

        // it('set system user roles', async () => {
        //     // Add system role for created user
        //     await roleService.setUserRole(
        //         {
        //             role: ESystemsRoles.super_admin,
        //             userId: 1,
        //         },
        //         true,
        //     )
        //     await roleService.setUserRole(
        //         {
        //             role: EDefaultRoles.admin,
        //             userId: 1,
        //         },
        //         true,
        //     )
        // })
    })

    // describe('createAccount', () => {
    //     const createAccountArgs = {
    //         fullname: 'dl_user',
    //         phone: '+380979995500',
    //         email: 'dl.service@email.com',
    //         password: 'dl.password',
    //         rePassword: 'dl.password',
    //         role: EDefaultRoles.admin,
    //     }

    //     it('should fail if user exists', async () => {
    //         usersRepository.findOne.mockResolvedValue({
    //             id: 1,
    //             phone: '+380979995500',
    //             email: 'dl.service@email.com',
    //         })
    //         const result = await service.createAccount(createAccountArgs)
    //     })
    // })
})
