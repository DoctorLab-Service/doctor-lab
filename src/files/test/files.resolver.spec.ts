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
    let service: jest.Mocked<FilesService>
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
})
