import { ValidationException } from 'src/exceptions/validation.exception'
import { FileUpload } from 'graphql-upload'
import { LanguageService } from 'src/language/language.service'
import { Inject, Injectable } from '@nestjs/common'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { UploadFilesOutput } from './dtos/upload-files.dto'
import { Cloudinary } from './libs/cloudinary.libs'
import { UploadOptions } from './files'
import { UploadApiResponse } from 'cloudinary'
import { DeleteFilesOutput } from './dtos/delete-files.dto'

@Injectable()
export class FilesService {
    private cloudinary: Cloudinary
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly cloudinaryOptions,
        private readonly languageService: LanguageService,
    ) {
        this.cloudinary = new Cloudinary(this.cloudinaryOptions)
    }

    async uploadFiles(attachments: FileUpload | FileUpload[], options?: UploadOptions): Promise<UploadFilesOutput> {
        try {
            let uploads: string[] | UploadApiResponse[]

            if (options && options.userId) {
                uploads = await this.cloudinary.uploadUserImages(attachments, options)
                console.log('uploads', uploads)
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
            console.log(error)
            throw new ValidationException({
                upload_file: await this.languageService.setError(['isNot', 'upload'], 'files'),
            })
        }
    }

    async deleteFiles(userId: number): Promise<DeleteFilesOutput> {
        const deletedFiles = this.cloudinary.deleteUserFile(userId)
        return { ok: Boolean(deletedFiles) }
    }
}
