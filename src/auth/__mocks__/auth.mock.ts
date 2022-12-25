import { outputAuthStub } from '../test/__stubs'

export const AuthService = {
    login: jest.fn().mockResolvedValue(outputAuthStub.login),
    logout: jest.fn().mockResolvedValue(outputAuthStub.logout),
    refreshToken: jest.fn().mockResolvedValue(outputAuthStub.refreshToken),
}
