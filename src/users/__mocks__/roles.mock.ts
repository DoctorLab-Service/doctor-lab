import { rolesOutputStub } from 'src/roles/test/__stubs/output.stub'

export const mockRolesService = () => ({
    setUserRole: jest
        .fn()
        .mockReturnValueOnce(
            rolesOutputStub({
                role: true,
                user: true,
                roleType: 'system',
                roleKey: 'super_admin',
            }),
        )
        .mockReturnValueOnce(
            rolesOutputStub({
                role: true,
                user: true,
                roleType: 'system',
                roleKey: 'admin',
            }),
        ),
})
