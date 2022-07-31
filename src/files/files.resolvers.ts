import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FilesService } from './files.services'
import { UploadFilesOutput } from './dtos/upload-files.dto'

@Resolver()
export class FilesResolver {
    constructor(private readonly filesService: FilesService) {}

    @Mutation(() => UploadFilesOutput)
    async uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload })
        file: FileUpload,
    ): Promise<UploadFilesOutput> {
        return this.filesService.upload(file)
    }

    @Mutation(() => UploadFilesOutput)
    async uploadFiles(
        @Args({ name: 'files', type: () => [GraphQLUpload] })
        files: FileUpload[],
    ): Promise<UploadFilesOutput> {
        return this.filesService.upload(files)
    }
}
