import { UploadApiOptions } from 'cloudinary'

export interface FilesModuleCloudinatyConfig {
    cloud_name: string
    api_key: string
    api_secret: string
    secure: boolean
}
export type CheckFolderKeys = '' | 'avatar' | 'images'

export interface UploadOptions {
    userId?: number
    key?: CheckFolderKeys
    fullData?: boolean
    uploadOptions?: UploadApiOptions
}

// export interface UploadApiResponse {
//     public_id: string
//     version: number
//     signature: string
//     width: number
//     height: number
//     format: string
//     resource_type: string
//     created_at: string
//     tags: Array<string>
//     pages: number
//     bytes: number
//     type: string
//     etag: string
//     placeholder: boolean
//     url: string
//     secure_url: string
//     access_mode: string
//     original_filename: string
//     moderation: Array<string>
//     access_control: Array<string>
//     context: object
//     metadata: object

//     [futureKey: string]: any
// }
