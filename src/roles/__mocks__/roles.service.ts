import { rolesOutputStub } from '../../roles/test/__stubs/output.stub'

export const RolesService = () => ({
    _deffaultRoles: jest.fn(),
    createRole: jest.fn().mockResolvedValue(
        rolesOutputStub({
            role: true,
            user: false,
            roles: false,
        }),
    ),
    updateRole: jest.fn().mockResolvedValue(
        rolesOutputStub({
            role: true,
            user: false,
            roles: false,
        }),
    ),
    deleteRole: jest.fn().mockResolvedValue(
        rolesOutputStub({
            roles: false,
            role: false,
            user: false,
        }),
    ),
    setUserRole: jest.fn().mockResolvedValue(
        rolesOutputStub({
            role: true,
            user: true,
            roles: false,
        }),
    ),
    deleteUserRole: jest.fn().mockResolvedValue(
        rolesOutputStub({
            roles: false,
            role: false,
            user: false,
        }),
    ),
    findAllRoles: jest.fn().mockResolvedValue(
        rolesOutputStub({
            roles: true,
            role: false,
            user: false,
        }),
    ),
})
