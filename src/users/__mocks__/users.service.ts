import { userOutputStub } from '../test/__stubs/output.stub'

export const UsersService = jest.fn().mockReturnValue({
    _createSystemUser: jest.fn().mockResolvedValue(true),

    // Queries methods
    myAccount: jest.fn().mockResolvedValue(userOutputStub('user')),
    findAllUsers: jest.fn().mockResolvedValue(userOutputStub('all')),
    findById: jest.fn().mockResolvedValue(userOutputStub('user')),
    findByPhone: jest.fn().mockResolvedValue(userOutputStub('user')),
    findByEmail: jest.fn().mockResolvedValue(userOutputStub('user')),

    // Mutations methods
    createAccount: jest.fn().mockResolvedValue(userOutputStub('create')),
    updateAccount: jest.fn().mockResolvedValue(userOutputStub('user')),
    deleteAccount: jest.fn().mockResolvedValue(userOutputStub()),
    changeEmail: jest.fn().mockResolvedValue(userOutputStub()),
    changePhone: jest.fn().mockResolvedValue(userOutputStub()),
    changePassword: jest.fn().mockResolvedValue(userOutputStub()),
})
