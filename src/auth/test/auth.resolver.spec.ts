import { Test } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { AuthResolver } from '../auth.resolver'
import { inputAuthStub, outputAuthStub } from './__stubs'
import { LoginInput, LoginOutput, LogoutOutput, RefreshTokenOutput } from '../dtos'

jest.mock('../auth.service')

describe('AuthResolver', () => {
    let context: any = {}
    let service: AuthService
    let resolver: AuthResolver

    beforeEach(async () => {
        const _module = await Test.createTestingModule({
            providers: [AuthService, AuthResolver],
        }).compile()

        service = _module.get<AuthService>(AuthService)
        resolver = _module.get<AuthResolver>(AuthResolver)
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('login', () => {
        let input: LoginInput
        let output: LoginOutput
        let login: LoginOutput

        beforeEach(async () => {
            input = inputAuthStub('email').login
            login = await resolver.login(input)
        })

        test('should call login from service', async () => {
            expect(service.login).toBeCalled()
        })

        test('sould return a user and tokens', async () => {
            output = outputAuthStub.login
            expect(login).toMatchObject(output)
        })
    })

    describe('logout', () => {
        let output: LogoutOutput
        let logout: LogoutOutput

        beforeEach(async () => {
            context = {
                req: {
                    cookies: inputAuthStub().refreshToken,
                },
            }
            logout = await resolver.logout(context)
        })

        test('should call logout from service', async () => {
            expect(service.logout).toBeCalled()
        })

        test('sould return a user and tokens', async () => {
            output = outputAuthStub.logout
            expect(logout).toMatchObject(output)
        })
    })

    describe('refreshToken', () => {
        let output: RefreshTokenOutput
        let refreshToken: RefreshTokenOutput

        beforeEach(async () => {
            context = {
                req: {
                    cookies: inputAuthStub().refreshToken,
                },
            }
            refreshToken = await resolver.refreshToken(context)
        })

        test('should call refreshToken from service', async () => {
            expect(service.refreshToken).toBeCalled()
        })

        test('sould return a user and tokens', async () => {
            output = outputAuthStub.refreshToken
            expect(refreshToken).toMatchObject(output)
        })
    })
})
