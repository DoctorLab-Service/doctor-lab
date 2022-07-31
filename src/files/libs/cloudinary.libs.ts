import { FileUpload } from 'graphql-upload'
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_PATH_USERS } from '../path.constants'
import { parse } from 'path'

export type CheckFolderKeys = 'avatar' | 'images'

export class Cloudinary {
    constructor(private readonly options) {
        cloudinary.config(this.options)
    }

    /**
     * Uploads an image file in cloudinary
     * @param file FileUpload
     * @param options   folder (string) is required options
     * @param cName no required custom file name
     * @param fullData no required boolean, false return image path string, true return image object with full data
     * @returns image path string or image object with full data
     */
    private async upload_stream(file: FileUpload, options: UploadApiOptions, cName = '', fullData = false) {
        //  Read File
        const { createReadStream, filename } = await file
        const stream = createReadStream()

        let { ext, name } = parse(filename)
        name = `doctorlab_${cName}${Math.floor(Math.random() * 1000000 + 1)}_${Date.now()}`
        ext = ext.split('.')[1]

        const deffaultOption = {
            public_id: options.public_id || name,
            use_filename: options.use_filename || false,
            unique_filename: options.unique_filename || true,
            resource_type: options.resource_type || 'image',
            format: options.format || ext,
            ...options,
            // folder: 'doctorlab/users/u125/avatar',
            // tags: [`u125`, 'avatar'],
            // context: `alt=user_avatar`,
        }

        /*
          Upload stream in cloudinary
         */
        let image: Record<string, any> | string = {}
        const cloudinaryUpload = async ({ stream }) => {
            try {
                await new Promise((resolve, reject) => {
                    const streamFile = cloudinary.uploader.upload_stream(deffaultOption, function (error, result) {
                        if (result) {
                            fullData ? (image = { ...result }) : (image = { secure_url: result.secure_url })
                            resolve(image)
                        } else {
                            reject(error)
                        }
                    })
                    stream.pipe(streamFile)
                })
            } catch (error) {
                console.log(error)
                throw new Error('Failed to upload file(s)')
            }
        }
        await cloudinaryUpload({ stream })

        return image
    }

    /**
     * Check if the user id is exiset or not.
     * If not exist to create on cloudinary user id folder
     * @param id string for user
     * @returns array of user id folders
     */
    private async getUsersFolder(id: string | number): Promise<any[]> {
        try {
            // Check users folder in cloudinary
            // Check users folde by id
            const foldersCloud = await cloudinary.api.sub_folders(CLOUDINARY_PATH_USERS)
            let usersIdFolder: any[] = foldersCloud.folders.filter(folder => folder.name === `user_${id}`)

            // If user id folder not exist then create folder
            if (!usersIdFolder.length) {
                usersIdFolder = await cloudinary.api.create_folder(`${CLOUDINARY_PATH_USERS}/user_${id}`)
            }

            // Get users folder and all to this exists
            const usersFolder = await cloudinary.api.sub_folders(`${CLOUDINARY_PATH_USERS}/user_${id}`)
            return usersFolder || []
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    /**
     * Check user's folder by existing folder by key and if not exist, create folder
     * @param userId User ID
     * @param key key for check sub-folders using userId (avatar | images)
     * @returns finded folders from user's sub-folders
     */
    private async checkFolder(userId: string | number, key: CheckFolderKeys) {
        const usersFolder: any = await this.getUsersFolder(userId)
        let folder: any[] = usersFolder.folders.filter(folder => folder.name === key)
        if (!folder.length && usersFolder.length) {
            folder = await cloudinary.api.create_folder(`${usersFolder[0].path}/${key}`)
        }
        return folder
    }

    /**
     * Upload user image using user, upload in cloudinary
     * @param userId User ID
     * @param file Uploaded file
     * @param key avatar | images
     * @param fullData no required boolean, false return image path string, true return image object with full data
     * @returns image path (string) or image object (with all data)
     */
    async uploadUserImages(
        userId: string | number,
        files: FileUpload | FileUpload[],
        key: CheckFolderKeys,
        fullData = false,
    ) {
        if (files === undefined) throw new Error()
        await this.checkFolder(userId, key)
        const images = []
        const filesArr = files.length ? files : [files]

        for (let i = 0; i < filesArr.length; i++) {
            const image = await this.upload_stream(
                filesArr[i],
                {
                    folder: `doctorlab/users/u${userId}/${key}`,
                    tags: [`u${userId}`, key],
                    context: `alt=user_${key}`,
                },
                `u${userId}_${key}`,
                fullData,
            )
            images.push(fullData ? image : image.secure_url)
        }

        return images.length > 1 ? images : images[0]
    }
}
