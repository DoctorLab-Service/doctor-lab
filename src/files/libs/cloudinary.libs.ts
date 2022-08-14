import { object } from 'src/common/helpers'
import { FileUpload } from 'graphql-upload'
import { AdminAndResourceOptions, UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_PATH_USERS } from '../path.constants'
import { parse } from 'path'
import { CheckFolderKeys, UploadOptions } from '../files'

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
     * @returns Promise<UploadApiResponse | Record<string, any>>  image object with full data
     */
    private async upload_stream(
        file: FileUpload,
        options: UploadApiOptions,
        cName = '',
        fullData = false,
    ): Promise<UploadApiResponse | Record<string, any>> {
        try {
            //  Read File
            const { createReadStream, filename } = await file
            const stream = createReadStream()

            // Cut filename to ext and name
            // And split
            let { ext, name } = parse(filename)
            name = `doctorlab_${cName}${Math.floor(Math.random() * 1000000 + 1)}_${Date.now()}`
            ext = ext.split('.')[1]

            // Default cloudinary option
            const defaultOption = {
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

            // Upload stream in cloudinary
            let image: UploadApiResponse | Record<string, any> | string = {}
            const cloudinaryUpload = async ({ stream }) => {
                try {
                    await new Promise((resolve, reject) => {
                        const streamFile = cloudinary.uploader.upload_stream(defaultOption, function (error, result) {
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
                    throw new Error(error)
                }
            }
            await cloudinaryUpload({ stream })

            return image
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to upload stream file(s)`)
        }
    }

    /**
     * Get sub folders
     * @param path string
     * @returns array of sub folders
     */
    private async subFolders(path: string): Promise<any> {
        const sub = await cloudinary.api.sub_folders(path)
        return sub.folders || []
    }

    /**
     * Check if the user id is exiset or not.
     * If not exist to create on cloudinary user id folder
     * @param userId number for user
     * @param create boolean (default true) if false dont create user folder, if true create user folder
     * @returns array of user id folders
     */
    private async getUsersFolder(userId: number, create = true): Promise<any> {
        try {
            let usersFolder = {}
            if (userId !== undefined) {
                // Check users folder in cloudinary
                // Check users folde by id
                const foldersCloud = await this.subFolders(`${CLOUDINARY_PATH_USERS}`)
                let usersIdFolder = foldersCloud.filter(folder => folder.name === `u${userId}`)

                // If user id folder not exist then create folder
                if (!usersIdFolder.length && usersIdFolder !== undefined && create) {
                    usersIdFolder = await cloudinary.api.create_folder(`${CLOUDINARY_PATH_USERS}/u${userId}`)
                }

                // Get users folder and all to this exists
                if (usersIdFolder !== undefined) {
                    usersFolder = await this.subFolders(`${CLOUDINARY_PATH_USERS}/u${userId}`)
                    return usersFolder
                }
                return usersFolder
            }
            return usersFolder
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to getting users folder`)
        }
    }

    /**
     * Get resource in folder
     * @param options AdminAndResourceOptions
     * @returns array of user id resources
     */
    private async getUsersResources(options?: AdminAndResourceOptions): Promise<any> {
        const resources = await cloudinary.api.resources(options)
        return resources.resources || []
    }

    /**
     * Check user's folder by existing folder by key and if not exist, create folder
     * @param userId User ID
     * @param key key for check sub-folders using userId (avatar | images)
     * @returns finded folders from user's sub-folders
     */
    private async checkFolder(userId: number, key: CheckFolderKeys): Promise<any[]> {
        try {
            const usersFolder: any = await this.getUsersFolder(userId)
            let folder: any[] = usersFolder.folders.filter(folder => folder.name === key)
            if (!folder.length && usersFolder.length) {
                folder = await cloudinary.api.create_folder(`${usersFolder[0].path}/${key}`)
            }
            return folder
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to check folder`)
        }
    }

    /**
     * Upload user image using user, upload in cloudinary
     * @param userId User ID
     * @param options UploadOptions
     * @returns image path (string) or image object (with all data)
     */
    async uploadUserImages(
        files: FileUpload | FileUpload[],
        options?: UploadOptions,
    ): Promise<string[] | UploadApiResponse[]> {
        if (files === undefined) throw new Error('Empty files fields')
        const images: UploadApiResponse[] | string[] = []
        try {
            if (options && options.key && options.userId) {
                await this.checkFolder(options.userId, options.key)
                const filesArr = files.length ? files : [files]

                for (let i = 0; i < filesArr.length; i++) {
                    const image = await this.upload_stream(
                        filesArr[i],
                        {
                            folder: `${CLOUDINARY_PATH_USERS}/u${options.userId}/${options.key}`,
                            tags: [`u${options.userId}`, options.key.length && options.key],
                            context: `alt=user_${options.key}`,
                            ...options.uploadOptions,
                        },
                        `u${options.userId}_${options.key}`,
                        options.fullData,
                    )
                    images.push(options.fullData ? image : image.secure_url)
                }
            }
            return images
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to upload file(s)`)
        }
    }

    /**
     * Delete usersFile by id from cloudinary
     * @param userId user ID
     * @returns boolean, if user folder is deleted return true if not return false
     */
    async deleteUserFile(userId: number): Promise<boolean> {
        try {
            // Get user folder
            let usersFolder = await this.getUsersFolder(userId, false)

            // If not exist user folder
            if (object.isEmpty(usersFolder)) {
                throw new Error('User id is not availavle in cloudinary')
            }

            // Remove user's resource from cloudinary folder
            const resources = await this.getUsersResources({
                type: 'upload',
                prefix: `${CLOUDINARY_PATH_USERS}/u${userId}`, // add your folder
            })

            if (resources.length) {
                const public_ids = resources.map(res => res.public_id)
                await cloudinary.api.delete_resources(public_ids)
            }

            // delete user
            await usersFolder.forEach(async folder => {
                console.log('folder', folder)
                await cloudinary.api.delete_folder(`${CLOUDINARY_PATH_USERS}/u${userId}/${folder.name}`)
            })
            usersFolder = await this.getUsersFolder(userId, false)
            console.log('usersFolder', usersFolder)
            let deletedFolder
            if (!usersFolder.length) {
                deletedFolder = await cloudinary.api.delete_folder(`${CLOUDINARY_PATH_USERS}/u${userId}`)
            }

            let deleted = false
            if (object.isEmpty(deletedFolder)) {
                deleted = deletedFolder.deleted[0] === `${CLOUDINARY_PATH_USERS}/u${userId}`
            }
            return deleted
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to delete file(s)`)
        }
    }
}
