export class String {
    trim(str: string, splitSeparator?: string | RegExp, separator?: string, joinSeparator?: string): string {
        const arr: string[] = []
        str.toLowerCase()
            .split(splitSeparator || ' ')
            .forEach(el => {
                if (el === ' ' || el === '.' || el === '-' || el === '') {
                    el = separator || ''
                    if (arr[arr.length - 1] === (separator || '') || arr[arr.length - 1] === '') return
                    return arr.push(el)
                }
                return arr.push(el)
            })
        return arr.join(joinSeparator || '')
    }

    trimRole(role: string): string {
        return this.trim(role, /([-' '.])/g, '_')
    }
}

export const string = new String()
