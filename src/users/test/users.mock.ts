export const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
})

export const mockVerificationService = () => ({
    verificationEmailCode: jest.fn(),
    verificationPhoneCode: jest.fn(),
    passwordRecoveryCode: jest.fn(),
    changePasswordCode: jest.fn(),
    changeEmailCode: jest.fn(),
    changePhoneCode: jest.fn(),
    verificationEmail: jest.fn(),
    verificationPhone: jest.fn(),
    verificationPasswordRecovery: jest.fn(),
    verificationChangePassword: jest.fn(),
    verificationChangeEmail: jest.fn(),
    verificationChangePhone: jest.fn(),
})

export const mockEmailService = () => ({
    sendVerificationEmail: jest.fn(),
    sendPasswordRecovery: jest.fn(),
    sendChangeEmail: jest.fn(),
    sendChangeInfo: jest.fn(),
    sendHelpMassageEmail: jest.fn(),
})

export const mockTokenService = () => ({
    generateTokens: jest.fn(() => 'signed-token-baby'),
    validateToken: jest.fn(),
    findToken: jest.fn(),
    saveTokens: jest.fn(),
    removeToken: jest.fn(),
    removeTokenByUserId: jest.fn(),
    removeExpiredToken: jest.fn(),
    getContextUser: jest.fn(),
})

export const mockFilesService = () => ({
    uploadFiles: jest.fn(),
    deleteFiles: jest.fn(),
})

export const mockRoleService = () => ({
    createRole: jest.fn(),
    updateRole: jest.fn(),
    deleteRole: jest.fn(),
    setUserRole: jest.fn(),
    deleteUserRole: jest.fn(),
    findAllRoles: jest.fn(),
})

export const mockLanguageService = () => ({
    setError: jest.fn(),
    errors: jest.fn(),
})
