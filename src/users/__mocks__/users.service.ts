import { userMock } from '../test/__stubs/output.stub'

export const UsersService = jest.fn().mockReturnValue({
    _createSystemUser: jest.fn().mockResolvedValue(true),

    // Queries methods
    myAccount: jest.fn().mockResolvedValue(userMock('user')),
    findAllUsers: jest.fn().mockResolvedValue(userMock('all')),
    findById: jest.fn().mockResolvedValue(userMock('user')),
    findByPhone: jest.fn().mockResolvedValue(userMock('user')),
    findByEmail: jest.fn().mockResolvedValue(userMock('user')),

    // Mutations methods
    createAccount: jest.fn().mockResolvedValue(userMock('create')),
    updateAccount: jest.fn().mockResolvedValue(userMock('user')),
    deleteAccount: jest.fn().mockResolvedValue(userMock()),
    changeEmail: jest.fn().mockResolvedValue(userMock()),
    changePhone: jest.fn().mockResolvedValue(userMock()),
    changePassword: jest.fn().mockResolvedValue(userMock()),
})
