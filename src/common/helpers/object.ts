import { WithoutProperties } from './types'

export class CustomObject {
    /**
     * Check objec to empty or not if empry return true
     * @param obj any object
     * @returns boolean if empty return true if not return false
     */
    isEmpty(obj: object): boolean {
        return JSON.stringify(obj) === '{}'
    }

    /**
     * Check object length
     * @param obj any object
     * @returns count of objtct keys length
     */
    length(obj: object): number {
        return Object.keys(obj).length
    }

    /**
     * Get object without [keys]
     * @param obj object
     * @param keys array keys
     * @returns Return new object without keys
     */
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
