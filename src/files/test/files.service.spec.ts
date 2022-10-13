import { Test } from '@nestjs/testing'
import { FileUpload } from 'graphql-upload'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { ValidationException } from 'src/exceptions'
import { LanguageService } from 'src/language/language.service'
import { mockLanguageService } from 'src/language/__mocks__/languages.mock'
import { DeleteFilesOutput, DeleteFilesInput } from '../dtos/delete-files.dto'
import { UploadFilesOutput } from '../dtos/upload-files.dto'
import { UploadOptions } from '../files'
import { FilesService } from '../files.services'
import { Cloudinary } from '../libs/cloudinary.libs'
import { mockCloudinary } from '../__mocks__/cloudinary.mock'
import { mockFilesOptions } from '../__mocks__/files-options.mock'
import { uploadFileStub, uploadOptionsStub, uploadOutputStub } from './__stubs'

jest.mock('../libs/cloudinary.libs.ts')

describe('FilesService', () => {
    let service: FilesService
    let languageService: jest.Mocked<LanguageService>

    // Mocks
    let mockOptions: UploadOptions
    let cloudinary: jest.Mocked<Cloudinary>

    beforeEach(async () => {
        // Mocked
        mockOptions = { ...uploadOptionsStub }

        const _module = await Test.createTestingModule({
            providers: [
                FilesService,
                {
                    provide: LanguageService,
                    useValue: mockLanguageService(),
                },
                {
                    provide: CONFIG_OPTIONS,
                    useValue: mockFilesOptions(),
                },
                {
                    provide: Cloudinary,
                    useValue: mockCloudinary(),
                },
            ],
        }).compile()

        service = _module.get<FilesService>(FilesService)
        languageService = _module.get(LanguageService)
        cloudinary = _module.get(Cloudinary)
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    // Test to defined UsersService -- service
    test('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('uploadFiles', () => {
        let output: UploadFilesOutput
        let file: FileUpload

        beforeEach(async () => {
            file = uploadFileStub('file')
        })

        afterEach(async () => {
            jest.clearAllMocks()
        })

        test('should fail if user id is not exist in options', async () => {
            const errorMessage = 'Failed to upload file(s)'
            languageService.setError.mockResolvedValue(errorMessage)

            expect.assertions(2)
            try {
                await service.uploadFiles(file, {})
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ upload_file: errorMessage })
            }
        })

        test('should upload file | files in cloudinary', async () => {
            cloudinary.uploadUserImages.mockResolvedValue(uploadOutputStub('paths').paths)
            await service.uploadFiles(file, mockOptions)
            expect(cloudinary.uploadUserImages).toBeCalledWith(file, mockOptions)
        })

        test('should fail if not upload file | files', async () => {
            const errorMessage = 'Failed to upload file(s)'
            languageService.setError.mockResolvedValue(errorMessage)

            cloudinary.uploadUserImages.mockResolvedValue([])

            expect.assertions(2)
            try {
                await service.uploadFiles(file, mockOptions)
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationException)
                expect(error.messages).toEqual({ upload_file: errorMessage })
            }
        })

        test('should return paths', async () => {
            cloudinary.uploadUserImages.mockResolvedValue(uploadOutputStub('paths').paths)
            output = await service.uploadFiles(file, mockOptions)
            expect(output).toMatchObject({
                ...uploadOutputStub('paths'),
            })
        })

        test('should return files', async () => {
            cloudinary.uploadUserImages.mockResolvedValue(uploadOutputStub('files').files)
            output = await service.uploadFiles(file, mockOptions)
            expect(output).toMatchObject({
                ...uploadOutputStub('files'),
            })
        })

        test('should upload file | files/', async () => {
            cloudinary.uploadUserImages.mockResolvedValue(uploadOutputStub('paths').paths)
            await service.uploadFiles(file, mockOptions)
            expect(cloudinary.uploadUserImages).toBeCalledWith(file, mockOptions)
        })
    })

    describe('deleteFiles', () => {
        let output: DeleteFilesOutput
        let input: DeleteFilesInput

        beforeEach(async () => {
            input = { id: 1 }
        })

        afterEach(async () => {
            jest.clearAllMocks()
        })

        test('should delete files in cloudinary', async () => {
            cloudinary.deleteUserFile.mockResolvedValue(true)
            await service.deleteFiles(input.id)
            expect(cloudinary.deleteUserFile).toBeCalledWith(input.id)
        })

        test('should if deleted file return true', async () => {
            cloudinary.deleteUserFile.mockResolvedValue(true)
            output = await service.deleteFiles(input.id)
            expect(output).toEqual({ ok: true })
        })
    })
})
