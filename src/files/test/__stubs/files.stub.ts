import { UploadApiResponse } from 'cloudinary'
import { FileUpload } from 'graphql-upload'
import { createReadStream } from 'fs'
import { UploadOptions } from 'src/files/files'

export const fileStub = (): UploadApiResponse => ({
    asset_id: '5d8697c7eb419eda89a2aed64afbb4cd',
    public_id: 'doctorlab/users/u34/avatar/doctorlab_u34_avatar477874_1665069640632',
    version: 1665069641,
    version_id: 'e18769737a4366fe413931adaf129013',
    signature: '9e627a3534accd6b0b6680054be6192932179515',
    width: 1200,
    height: 630,
    format: 'png',
    resource_type: 'image',
    created_at: '2022-10-06T15:20:41Z',
    tags: ['u34', 'avatar'],
    bytes: 8713,
    type: 'upload',
    etag: '34d40ba12816c6c1cdeef163eda410cd',
    placeholder: false,
    url: 'http://res.cloudinary.com/dki4lxdki/image/upload/v1665069641/doctorlab/users/u34/avatar/doctorlab_u34_avatar477874_1665069640632.png',
    secure_url:
        'https://res.cloudinary.com/dki4lxdki/image/upload/v1665069641/doctorlab/users/u34/avatar/doctorlab_u34_avatar477874_1665069640632.png',
    folder: 'doctorlab/users/u34/avatar',
    access_mode: 'public',
    context: { custom: [Object] },
    original_filename: 'file',
    api_key: '821279233882751',
    pages: 1,
    moderation: [],
    access_control: [],
    metadata: {},
})

export const uploadOptionsStub: UploadOptions = {
    userId: 34,
    key: 'avatar',
    fullData: true,
}

export const uploadFileStub = (key: 'file' | 'files'): FileUpload | FileUpload[] => {
    const file = {
        filename: 'some_picture.png',
        mimetype: 'image/png',
        encoding: '7bit',
        createReadStream: createReadStream,
    }
    return key === 'files' ? [file] : file
}
