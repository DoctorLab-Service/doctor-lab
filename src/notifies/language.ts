import { ELanguage } from 'src/common/common.enums'
import { User } from 'src/users/entities/user.entity'
import { NotifyDto } from './dtos/notify.dto'
import { NotifiesService } from './notifies.service'

type TParams = {
    user?: User
    language?: ELanguage
    serviceName: string[]
    type: string
}
type TNotifies = {
    [key: string]: NotifyDto
}
export const setLanguageMessage = async (params: TParams) => {
    const notifiesService = new NotifiesService()
    const language = params.user ? params.user.language : params.language ? params.language : 'ru'
    const notifies: TNotifies = {}

    for (let i = 0; i < params.serviceName.length; i++) {
        await notifiesService.init(language, params.serviceName[i])
        const msg = await notifiesService.notify(params.type)
        notifies[params.serviceName[i]] = msg.messages
    }
    return { ...notifies }
}
