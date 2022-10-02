import { tokensStub } from '../test/__stubs'

export const mockTokenService = () => ({
    generateTokens: jest.fn().mockReturnValue({ ...tokensStub() }),
    saveTokens: jest.fn(),
})
