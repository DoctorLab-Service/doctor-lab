import { outputAuthStub } from '../test/__stubs'

export const AuthService = jest.fn().mockReturnValue({
    login: jest.fn().mockResolvedValue(outputAuthStub.login),
    logout: jest.fn().mockResolvedValue(outputAuthStub.logout),
    refreshToken: jest.fn().mockResolvedValue(outputAuthStub.refreshToken),
})
