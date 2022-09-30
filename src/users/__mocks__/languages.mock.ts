export const mockLanguageService = () => ({
    setError: jest.fn().mockResolvedValue("Couldn't create system account"),
})
