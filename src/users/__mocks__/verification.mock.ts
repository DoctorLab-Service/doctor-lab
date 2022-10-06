export const mockVerificationService = () => ({
    verificationEmailCode: jest.fn().mockResolvedValue(true),
    verificationPhoneCode: jest.fn().mockResolvedValue(true),
})
