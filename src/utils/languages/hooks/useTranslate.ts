import { useTranslation } from "react-i18next"

export const useTranslate = (type: string | null = null, layers: any = [],) => {
    const { t } = useTranslation(type)
    const translation: Record<string, any> = {}

    layers && layers.map(arg => {
        const typeArg = typeof (arg) === 'object'
        return translation[typeArg ? arg[0] : arg] = t(typeArg ? arg[0] : arg, {
            returnObjects: typeArg && arg[1] ? arg[1] : false
        })
    })


    return { translation, type }

}