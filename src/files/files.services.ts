import { ValidationException } from 'src/exceptions/validation.exception'
import { FileUpload } from 'graphql-upload'
import { LanguageService } from 'src/language/language.service'
import { Injectable } from '@nestjs/common'
import { UploadFilesOutput } from './dtos/upload-files.dto'
import { Cloudinary } from './libs/cloudinary.libs'
import { UploadOptions } from './files'
import { UploadApiResponse } from 'cloudinary'
import { DeleteFilesOutput } from './dtos/delete-files.dto'

@Injectable()
export class FilesService {
    constructor(private readonly cloudinary: Cloudinary, private readonly languageService: LanguageService) {}

    async uploadFiles(attachments: FileUpload | FileUpload[], options?: UploadOptions): Promise<UploadFilesOutput> {
        try {
            let uploads: string[] | UploadApiResponse[]

            if (options && options.userId) {
                uploads = await this.cloudinary.uploadUserImages(attachments, options)
                if (!uploads.length) {
                    throw new Error()
                }
            } else {
                throw new Error()
            }
            return {
                ok: true,
                paths: typeof uploads[0] === 'string' ? uploads : [],
                files: typeof uploads[0] === 'object' ? uploads : [],
            }
        } catch (error) {
            throw new ValidationException({
                upload_file: await this.languageService.setError(['isNot', 'upload'], 'files'),
            })
        }
    }

    async deleteFiles(id: number): Promise<DeleteFilesOutput> {
        const deletedFiles = this.cloudinary.deleteUserFile(id)
        return { ok: Boolean(deletedFiles) }
    }
}
