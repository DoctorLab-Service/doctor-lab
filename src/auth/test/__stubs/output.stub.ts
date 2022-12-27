import { tokensStub } from 'src/token/test/__stubs'
import { userStub } from 'src/users/test/__stubs'

export const outputAuthStub = {
    login: {
        ok: true,
        ...tokensStub(),
        user: userStub(),
    },
    logout: {
        ok: true,
    },
    refreshToken: {
        ok: true,
        ...tokensStub(),
        user: userStub(),
    },
}
