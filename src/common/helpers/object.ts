export class CustomObject {
    empty(object: object): boolean {
        return JSON.stringify(object || {}) !== '{}'
    }
}

export const object = new CustomObject()
