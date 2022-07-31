import { FileUpload } from 'graphql-upload'
import { LanguageService } from 'src/language/language.service'
import { Inject, Injectable } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { JwtService } from 'src/jwt/jwt.service'
import { UploadFilesOutput } from './dtos/upload-files.dto'
import { Cloudinary } from './libs/cloudinary.libs'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class FilesService {
    cloudinary: Cloudinary
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly cloudinaryOptions,
        @Inject(CONTEXT) private readonly context,
        private readonly jwt: JwtService,
        private readonly languageService: LanguageService,
    ) {
        this.cloudinary = new Cloudinary(cloudinaryOptions)
    }

    async upload(arg: FileUpload | FileUpload[]): Promise<UploadFilesOutput> {
        const currentUser: User = await this.jwt.getContextUser(this.context)
        const image = await this.cloudinary.uploadUserImages(currentUser.id, arg, 'avatar')
        return { ok: true }
    }
}
