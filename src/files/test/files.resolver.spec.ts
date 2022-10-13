import { Test } from '@nestjs/testing'
import { FileUpload } from 'graphql-upload'
import { FilesService } from './../files.services'
import { FilesResolver } from './../files.resolver'
import { UploadOptions } from '../files'
import { uploadFileStub, uploadOptionsStub, uploadOutputStub } from './__stubs'
import { UploadFilesOutput } from '../dtos/upload-files.dto'
import { DeleteFilesInput, DeleteFilesOutput } from '../dtos/delete-files.dto'

jest.mock('../files.services.ts')

describe('FilesResolver', () => {
    let service: jest.Mocked<FilesService>
    let resolver: FilesResolver

    let mockOptions: UploadOptions

    beforeEach(async () => {
        // Mocked
        mockOptions = { ...uploadOptionsStub }

        const _module = await Test.createTestingModule({
            providers: [FilesService, FilesResolver],
        }).compile()

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
        })

        test('should call uploadFiles from filesService', async () => {
            await resolver.uploadFile(file)
            expect(service.uploadFiles).toBeCalledWith(file, mockOptions)
        })
        test('should return paths', async () => {
            service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
            output = await resolver.uploadFile(file)

            expect(output).toMatchObject({
                ...uploadOutputStub('paths'),
            })
        })

        test('should return files', async () => {
            service.uploadFiles.mockResolvedValue(uploadOutputStub('files'))
            output = await resolver.uploadFile(file)

            expect(output).toMatchObject({
                ...uploadOutputStub('files'),
            })
        })
    })

    describe('uploadFiles', () => {
        let output: UploadFilesOutput
        let files: FileUpload

        beforeEach(async () => {
            files = uploadFileStub('files')
        })

        test('should call uploadFiles from filesService', async () => {
            await resolver.uploadFiles(files)
            expect(service.uploadFiles).toBeCalledWith(files, mockOptions)
        })
        test('should return paths', async () => {
            service.uploadFiles.mockResolvedValue(uploadOutputStub('paths'))
            output = await resolver.uploadFiles(files)

            expect(output).toMatchObject({
                ...uploadOutputStub('paths'),
            })
        })

        test('should return files', async () => {
            service.uploadFiles.mockResolvedValue(uploadOutputStub('files'))
            output = await resolver.uploadFiles(files)

            expect(output).toMatchObject({
                ...uploadOutputStub('files'),
            })
        })
    })

    describe('deleteFiles', () => {
        let input: DeleteFilesInput
        let output: DeleteFilesOutput

        beforeEach(async () => {
            input = { id: 1 }
        })

        test('should call deleteFiles from filesService', async () => {
            await resolver.deleteFiles(input)
            expect(service.deleteFiles).toBeCalledWith(input.id)
        })
        test('should return paths', async () => {
            service.deleteFiles.mockResolvedValue({ ok: true })
            output = await resolver.deleteFiles(input)
            expect(output).toMatchObject({ ok: true })
        })
    })
})
