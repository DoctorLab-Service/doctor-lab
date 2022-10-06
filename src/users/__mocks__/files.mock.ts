export const mockFilesService = () => ({
    uploadFiles: jest.fn(),
    deleteFiles: jest.fn().mockResolvedValue({ ok: true }),
})
