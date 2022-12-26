import { tokensStub } from '../test/__stubs'
import { userStub } from 'src/users/test/__stubs'

export const mockTokenService = () => ({
    generateTokens: jest.fn().mockReturnValue({ ...tokensStub() }),
    saveTokens: jest.fn(),
    removeToken: jest.fn(),
    removeTokenByUserId: jest.fn(),
    validateToken: jest.fn().mockReturnValue({ ...userStub() }),
    findToken: jest.fn().mockReturnValue({
        user: { ...userStub() },
        ...tokensStub(),
    }),
})
