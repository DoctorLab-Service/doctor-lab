import { WithoutProperties } from './types'

export class CustomObject {
    empty(object: object): boolean {
        return JSON.stringify(object || {}) !== '{}'
    }

    withoutProperties(obj: object, keys: string[]): WithoutProperties {
        const target = {}
        for (const i in obj) {
            if (keys.indexOf(i) >= 0) continue
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
            target[i] = obj[i]
        }
        return target
    }
}

export const object = new CustomObject()
