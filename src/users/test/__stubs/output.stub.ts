import { systemRolesStub } from 'src/roles/test/__stubs/roles.stub'
import { userStub } from './user.stub'

export const userOutputStub = (key?: 'create' | 'user' | 'all') => {
    const response = {
        ok: true,
    }

    if (key === 'user') {
        response['user'] = userStub()
    }
    if (key === 'all') {
        response['users'] = [userStub()]
    }

    if (key === 'create') {
        response['accessToken'] =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI1LCJpYXQiOjE2NTg3NDkyMjIsImV4cCI6MTY1ODc5MjQyMn0.CU8edkh645uiAeZFBjCfTJzQ5JfWvO-jlygiCEVR5Fc'
        userStub().roles = [systemRolesStub()[1]]
        response['user'] = userStub()
    }
    return response
}
