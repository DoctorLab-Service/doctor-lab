import { userStub } from 'src/users/test/__stubs'
import { RolesStubParams } from '../types'
import { customRoleStub, systemRolesStub } from './roles.stub'

export const rolesOutputStub = (params: RolesStubParams) => {
    const result = { ok: true }
    let systemRole: any = null

    if (params.roleType === 'system' && params.roleKey) {
        systemRole = systemRolesStub().filter(role => role.roleKey === params.roleKey)[0]
    }
    if (params.role) {
        result['role'] = systemRole ?? customRoleStub()
    }
    if (params.user) {
        userStub().roles = [systemRolesStub()[0], systemRolesStub()[1]] // Set created roles for _createSystemUser
        result['user'] = userStub()
    }
    if (params.roles) {
        result['roles'] = [customRoleStub()]
    }

    return result
}
