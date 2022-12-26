import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LanguageService } from 'src/language/language.service'
import { mockLanguageService } from 'src/language/__mocks__/languages.mock'
import { TokenService } from 'src/token/token.service'
import { mockTokenService } from 'src/token/__mocks__/token.mock'
import { User } from 'src/users/entities'
import { MockRepository } from 'src/users/test/types'
import { mockRepository } from 'src/users/__mocks__/users.repository'
import { AuthService } from '../auth.service'
import { LoginInput, LoginOutput } from '../dtos/login.dto'
import { userStub } from 'src/users/test/__stubs'
import { inputAuthStub, outputAuthStub } from './__stubs'
import { ForbiddenException, ValidationException } from 'src/exceptions'
import { checkPassword } from 'src/users/helpers'
import { LogoutInput, LogoutOutput } from '../dtos/logout.dto'
import { RefreshTokenInput, RefreshTokenOutput } from '../dtos'

describe('AuthService', () => {
    let service: AuthService
    let usersRepository: MockRepository<User>
    let tokenService: jest.Mocked<TokenService>
    let languageService: jest.Mocked<LanguageService>

    beforeEach(async () => {
        const _module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository(),
                },
                {
                    provide: TokenService,
                    useValue: mockTokenService(),
                },
                {
                    provide: LanguageService,
                    useValue: mockLanguageService(),
                },
            ],
        }).compile()

        // Services
        service = _module.get<AuthService>(AuthService)
        tokenService = _module.get(TokenService)
        languageService = _module.get(LanguageService)

        // Repositories
        usersRepository = _module.get(getRepositoryToken(User))
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    // Test to defined UsersService -- service
    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('login', () => {
        let input: LoginInput
        let output: LoginOutput
        let mockUser: User
        let passwordToken: string

        beforeEach(async () => {
            mockUser = {
                ...userStub(),
            }
        })

        afterEach(async () => {
            jest.clearAllMocks()
        })

        test('should to find user by email', async () => {
            input = inputAuthStub('email').login
            usersRepository.findOne.mockResolvedValue({ ...mockUser, password: null })

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(usersRepository.findOne).toBeCalledTimes(1)
                expect(usersRepository.findOne).toBeCalledWith({ where: { email: input.email } })
            }
        })

        test('should to find user by phone', async () => {
            input = inputAuthStub('phone').login
            usersRepository.findOne.mockResolvedValue({ ...mockUser, password: null })

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(usersRepository.findOne).toBeCalledTimes(1)
                expect(usersRepository.findOne).toBeCalledWith({ where: { phone: input.phone } })
            }
        })

        test('should to find user by facebookId', async () => {
            input = inputAuthStub('facebookId').login
            usersRepository.findOne.mockResolvedValue({ ...mockUser, password: null })

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(usersRepository.findOne).toBeCalledTimes(1)
                expect(usersRepository.findOne).toBeCalledWith({ where: { facebookId: input.facebookId } })
            }
        })

        test('should to find user by googleId', async () => {
            input = inputAuthStub('googleId').login
            usersRepository.findOne.mockResolvedValue({ ...mockUser, password: null })

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(usersRepository.findOne).toBeCalledTimes(1)
                expect(usersRepository.findOne).toBeCalledWith({ where: { googleId: input.googleId } })
            }
        })

        test('should fail if email or phone is not exist', async () => {
            input = inputAuthStub('email').login
            usersRepository.findOne.mockResolvedValue(null)

            const errorMessage = 'User with this email address not found'
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ email: errorMessage })
            }
        })

        test('should fail if not user and exist facebookId or googleId', async () => {
            input = inputAuthStub('facebookId').login
            usersRepository.findOne.mockResolvedValue(null)

            const errorMessage = 'Invalid facebook'
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ facebookId: errorMessage })
            }
        })

        test('should fail if not correct passwords', async () => {
            input = inputAuthStub('email').login
            passwordToken = '$2b$12$L9PWkv5YXnDXBD4Zw6S0FOcUYMiRDZ5RZBi9OlYtiB2g2/tuVx21C'
            usersRepository.findOne.mockResolvedValue({ ...mockUser, password: passwordToken })

            await checkPassword(input.password, passwordToken)

            const errorMessage = "Passwords don't match"
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ password: errorMessage })
            }
        })

        test('should fail if tokens is not generate', async () => {
            input = inputAuthStub('email').login
            const tokens = {
                accessToken: '',
                refreshToken: '',
            }

            usersRepository.findOne.mockResolvedValue({ ...mockUser })
            tokenService.generateTokens.mockReturnValue(tokens)

            const errorMessage = "Couldn't create token, try to login"
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.login(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ create: errorMessage })
            }
        })

        test('should login', async () => {
            input = inputAuthStub('email').login
            output = outputAuthStub.login

            usersRepository.findOne.mockResolvedValue({ ...mockUser })

            const login = await service.login(input)
            expect(login).toMatchObject(output)
        })
    })

    describe('logout', () => {
        let input: LogoutInput
        let output: LogoutOutput

        afterEach(async () => {
            jest.clearAllMocks()
        })

        test('sould fail if not exist refresh token', async () => {
            input = { refreshToken: '' }

            const errorMessage = 'User is not authorized'
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.logout(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ForbiddenException)
                expect(error.messages).toEqual({ auth: errorMessage })
            }
        })

        test('sould logout', async () => {
            input = inputAuthStub().refreshToken
            output = outputAuthStub.logout

            const logout = await service.logout(input)
            expect(logout).toMatchObject(output)
        })
    })

    describe('refreshToken', () => {
        let input: RefreshTokenInput
        let output: RefreshTokenOutput
        let mockUser: User

        beforeEach(async () => {
            mockUser = {
                ...userStub(),
            }
        })

        afterEach(async () => {
            jest.clearAllMocks()
        })

        test('sould fail if not exist refresh token', async () => {
            input = { refreshToken: '' }

            const errorMessage = 'User is not authorized'
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.logout(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ForbiddenException)
                expect(error.messages).toEqual({ auth: errorMessage })
            }
        })

        test('should fail if token is not valid', async () => {
            input = inputAuthStub().refreshToken
            // const mockUser = { ...userStub() }

            // const userData = await this.token.validateToken('refreshToken', refreshToken)
            // const tokenFromDb = await this.token.findToken('refreshT oken', refreshToken)
            // if (!userData || !tokenFromDb) {
            //     throw new ForbiddenException({
            //         auth: await this.languageService.setError(['isNotAuth', 'auth']),
            //     })
            // }

            tokenService.validateToken.mockReturnValue(userStub())
            tokenService.findToken.mockResolvedValue(userStub())

            const errorMessage = 'User is not authorized'
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.refreshToken(input)
            } catch (error) {
                expect(error).toBeInstanceOf(ForbiddenException)
                expect(error.messages).toEqual({ auth: errorMessage })
            }
        })
        test.todo('should fail if token is not fonund in database')
        test.todo('should refresh token')
    })
})
