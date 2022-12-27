import { userStub } from 'src/users/test/__stubs'

export const tokensStub = () => ({
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE2NTg3NDkyMjIsImV4cCI6MTY1ODc5MjQyMn0.CU8edkh645uiAeZFBjCfTJzQ5JfWvO-jlygiCEVR5Fc',
    refreshToken:
        'eyJhbGci858IUzI1NiIsInR5cCI6IkpXV859.eyJpZCI6MTI1LCJpYXQiOjE2NTg388kyMjIsImV4cCI6MTY1ODc5MjQyMn0.CU8edkh645uiAeZFBjCfderdJfWvO-jlygiCEVsR898',
})

export const tokenDBStub = {
    id: 1,
    user: { ...userStub() },
    ...tokensStub(),
    recoveryToken: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 1,
}
