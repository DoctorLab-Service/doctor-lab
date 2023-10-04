import { LanguageService } from 'src/language/language.service'
import { User } from 'src/users/entities'
import { UserRoles, Role } from '../entities'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RolesService } from '../roles.service'
import { mockLanguageService } from 'src/language/__mocks__/languages.mock'
import { mockRepository } from 'src/__mocks__/repository.mock'
import { MockRepository } from 'src/__mocks__/types'
import { FindAllRolesOutput } from '../dtos/find.dto'
import { systemRolesStub, customRoleStub, userRolesStub } from './__stubs'
import { ValidationException } from 'src/exceptions'
import { CreateRoleInput, CreateRoleOutput } from '../dtos/create-role.dto'
import { userStub } from 'src/users/test/__stubs'
import { ERolesType } from '../roles.enums'
import { getCurrentUser } from 'src/users/helpers'

describe('RolesService', () => {
    let context = {}
    let mockUser: User

    let service: RolesService
    let usersRepository: MockRepository<User>
    let userRolesRepository: MockRepository<UserRoles>
    let rolesRepository: MockRepository<Role>
    let languageService: jest.Mocked<LanguageService>

    // Start befrore testing
    beforeEach(async () => {
        const _module = await Test.createTestingModule({
            providers: [
                RolesService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository(),
                },
                {
                    provide: getRepositoryToken(UserRoles),
                    useValue: mockRepository(),
                },
                {
                    provide: getRepositoryToken(Role),
                    useValue: mockRepository(),
                },
                {
                    provide: LanguageService,
                    useValue: mockLanguageService(),
                },
            ],
        }).compile()

        // Services
        service = _module.get<RolesService>(RolesService)
        languageService = _module.get(LanguageService)

        // Repositories
        usersRepository = _module.get(getRepositoryToken(User))
        userRolesRepository = _module.get(getRepositoryToken(UserRoles))
        rolesRepository = _module.get(getRepositoryToken(Role))

        // Mock context
        mockUser = { ...userStub() }
        context = {
            req: {
                user: { ...mockUser },
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

    describe('_deffaultRoles', () => {
        test('should find all roles', async () => {
            const roles = systemRolesStub()
            rolesRepository.find.mockResolvedValue([...roles])

            const _deffaultRoles = await service._deffaultRoles()
            expect(_deffaultRoles).toBe(true)
        })

        test('should create default roles', async () => {
            const rolesFromDB = systemRolesStub().slice(1)
            const roles = systemRolesStub()
            const mockCreateRole = {
                role: systemRolesStub()[0].role,
                description: systemRolesStub()[0].description,
                type: systemRolesStub()[0].type,
                user: systemRolesStub()[0].user,
            }

            rolesRepository.find.mockResolvedValue([...rolesFromDB])
            rolesRepository.create.mockReturnValue(roles[0])
            rolesRepository.save.mockResolvedValue(roles[0])

            const _deffaultRoles = await service._deffaultRoles()

            expect(rolesRepository.create).toBeCalledTimes(1)
            expect(rolesRepository.create).toBeCalledWith(mockCreateRole)

            expect(rolesRepository.save).toBeCalledTimes(1)
            expect(rolesRepository.save).toBeCalledWith(roles[0])

            expect(_deffaultRoles).toBe(true)
        })
    })

    describe('createRole', () => {
        let input: CreateRoleInput
        let output: CreateRoleOutput

        beforeEach(async () => {
            input = {
                role: customRoleStub().role,
                roleKey: customRoleStub().roleKey,
                description: customRoleStub().description,
                type: customRoleStub().type,
                user: customRoleStub().user,
            }
        })

        test('should fail if find role', async () => {
            rolesRepository.findOne.mockResolvedValue(customRoleStub())

            const errorMessage = 'Role already exists'
            languageService.setError.mockResolvedValue(errorMessage)

            try {
                await service.createRole(input, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ exists: errorMessage })
            }
        })

        test('should get current user from context', async () => {
            input.type = ERolesType.system
            mockUser.roles = [userRolesStub()]
            usersRepository.findOne.mockResolvedValue({ ...mockUser })
            context = {
                req: {
                    user: { ...mockUser },
                },
            }

            const currentUser = getCurrentUser(context)
            await rolesRepository.findOne.mockResolvedValueOnce(null)

            await service.createRole(input, context)

            expect(currentUser).toEqual(mockUser)
        })

        test('should fail if input type system and user do not have system role', async () => {
            input.type = ERolesType.system
            const currentUser = getCurrentUser(context)

            const errorMessage = 'You do not have permission to create the system role'
            languageService.setError.mockResolvedValue(errorMessage)

            try {
                await service.createRole(input, context)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ permission: errorMessage })
            }
        })
        test.todo('should fail if not find user')
        test.todo('should create role')
    })

    describe('updateRole', () => {
        test.todo('should fail if find role')
        test.todo('should fail if user is not owner and do not have system role')
        test.todo('should fail if input type system and user do not have system role')
        test.todo('should fail if role is exist')
        test.todo('should fail if input have not input properties')
        test.todo('should fail if input type system and user do not have system role')
        test.todo('should update system role if input type system and user have system role')
        test.todo('should udpate role')
    })

    describe('deleteRole', () => {
        test.todo('should fail if role is not found in database')
        test.todo('should fail if user is not owner and do not have system role')
        test.todo('should fail if input type system and user do not have system role')
        test.todo('should delete role ')
    })

    describe('setUserRole', () => {
        test.todo('should fail if candidate is not found')
        test.todo('should fail if current user is not found')
        test.todo('should fail if role is not found')
        test.todo('should create user role')
    })

    describe('deleteUserRole', () => {
        test.todo('should fail if candidate is not found')
        test.todo('should fail if candidate role type is system and candidate is not super admin')
        test.todo('should delete system user role')
        test.todo('should delete user role')
    })

    describe('findAllRoles', () => {
        let output: FindAllRolesOutput

        test('should get all roles', async () => {
            const roles = [...systemRolesStub(), ...[customRoleStub()]]
            output = { ok: true, roles }

            rolesRepository.find.mockResolvedValue(roles)

            const findAllRoles = await service.findAllRoles()

            expect(findAllRoles).toMatchObject(output)
        })
    })
})
