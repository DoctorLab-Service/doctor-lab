import * as path from 'path'
import { ColorsFG } from './helpers'

export const CustomErrorException = (consoleMessage?: string, message?: string): string => {
    const errorColors: ColorsFG = ColorsFG.red
    const errors = new Error().stack.split('at ')
    const errorPath: string[] = []

    // Split and filter errors and push in errorPath
    for (let i = 1; i < errors.length; i++) {
        const name = errors[i].split(' ')[0]
        const src = errors[i].split('src')[1]

        if (src !== undefined) {
            const pathSrc = path.join('src', errors[i].split('src')[1])
            const msg = `${name} (${pathSrc}) \n`

            errorPath.push(msg)
        }
    }

    console.log('')
    console.error(errorColors, `[CUSTOM_ERROR] ${consoleMessage}: \n`, ` \n ${errorPath.join('')}`)
    return message
}
