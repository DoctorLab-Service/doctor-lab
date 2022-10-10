import { fileStub } from './files.stub'

export const uploadOutputStub = (key: 'paths' | 'files') => {
    const output = {
        paths: key === 'paths' ? [fileStub().secure_url] : [],
        files: key === 'files' ? [fileStub()] : [],
    }
    return output
}
