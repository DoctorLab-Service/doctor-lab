import { Test } from '@nestjs/testing'
import { FileUpload } from 'graphql-upload'
import { FilesService } from './../files.services'
import { FilesResolver } from './../files.resolver'
import { UploadOptions } from '../files'
import { uploadFileStub, uploadOptionsStub, uploadOutputStub } from './__stubs'
import { UploadFilesOutput } from '../dtos/upload-files.dto'
import { mockFilesOptions } from '../__mocks__/files-options.mock'

jest.mock('../files.services.ts')

describe('FilesResolver', () => {
    let service: jest.Mocked<FilesService></FilesService>
    let resolver: FilesResolver

    let mockOptions: UploadOptions

    beforeEach(async () => {
        // Mocked
        mockOptions = { ...uploadOptionsStub }

        const _module = await Test.createTestingModule({
            providers: [FilesService, FilesResolver],
        }).compile()

        // service = _module.get(FilesService)
        service = _module.get(FilesService)
        resolver = _module.get<FilesResolver>(FilesResolver)
    })

    afterEach(async () => {
        jest.clearAllMocks()
    })

    describe('uploadFile', () => {
        let output: UploadFilesOutput
        let file: FileUpload

        beforeEach(async () => {
            file = uploadFileStub('file')
            output = await resolver.uploadFile(file)
        })

        test('should call filesService', async () => {
            expect(service.uploadFiles).toBeCalledWith(file, mockOptions)
        })
        test('should return paths', async () => {
            service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
            expect(output).toMatchObject({
                ...uploadOutputStub('paths'),
            })
        })
    })

    // describe('uploadFile', () => {
    //     let output: UploadFilesOutput

    //     beforeEach(async () => {
    //         mockAttachments = { ...uploadFileStub('file') }
    //     })

    //     test('should call filesService', async () => {
    //         service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
    //         await service.uploadFiles(mockAttachments, mockOptions)
    //         expect(service.uploadFiles).toBeCalledWith(mockAttachments, mockOptions)
    //     })

    //     test('should return paths', async () => {
    //         service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
    //         output = await service.uploadFiles(mockAttachments, mockOptions)

    //         expect(output).toMatchObject({
    //             ...uploadOutputStub('paths'),
    //         })
    //     })

    //     test('should return files', async () => {
    //         service.uploadFiles.mockResolvedValue(uploadOutputStub('files'))
    //         output = await service.uploadFiles(mockAttachments, mockOptions)

    //         expect(service.uploadFiles).toBeCalledTimes(1)
    //         expect(output).toMatchObject({
    //             ...uploadOutputStub('files'),
    //         })
    //     })
    // })

    // describe('uploadFiles', () => {
    //     let output: UploadFilesOutput

    //     beforeEach(async () => {
    //         mockAttachments = [...uploadFileStub('files')]
    //     })

    //     test('should call filesService', async () => {
    //         service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
    //         await service.uploadFiles([mockAttachments], mockOptions)
    //         expect(service.uploadFiles).toBeCalledWith([mockAttachments], mockOptions)
    //     })

    //     test('should return paths', async () => {
    //         service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
    //         output = await service.uploadFiles([mockAttachments], mockOptions)

    //         expect(output).toMatchObject({
    //             ...uploadOutputStub('paths'),
    //         })
    //     })

    //     test('should return files', async () => {
    //         service.uploadFiles.mockResolvedValue(uploadOutputStub('files'))
    //         output = await service.uploadFiles([mockAttachments], mockOptions)

    //         expect(service.uploadFiles).toBeCalledTimes(1)
    //         expect(output).toMatchObject({
    //             ...uploadOutputStub('files'),
    //         })
    //     })
    // })
})
