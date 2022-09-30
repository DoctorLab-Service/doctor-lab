import { ERolesType } from '../../roles.enums'
import { RolesStub } from '../types'

export const systemRolesStub = (): RolesStub[] => [
    {
        id: 1,
        role: 'super_admin',
        roleKey: 'super_admin',
        description: 'super_admin role description',
        type: ERolesType.system,
        user: null,
    },
    {
        id: 2,
        role: 'admin',
        roleKey: 'admin',
        description: 'Admin role description',
        type: ERolesType.system,
        user: null,
    },
    {
        id: 3,
        role: 'patient',
        roleKey: 'patient',
        description: 'patient role description',
        type: ERolesType.system,
        user: null,
    },
    {
        id: 4,
        role: 'doctor',
        roleKey: 'doctor',
        description: 'doctor role description',
        type: ERolesType.system,
        user: null,
    },
    {
        id: 5,
        role: 'dentist',
        roleKey: 'dentist',
        description: 'dentist role description',
        type: ERolesType.system,
        user: null,
    },
]

export const customRoleStub = (): RolesStub => ({
    id: 6,
    role: 'SomeRole',
    roleKey: 'some_role',
    description: 'some_role role description',
    type: ERolesType.custom,
    user: 1,
})
