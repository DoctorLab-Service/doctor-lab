import { Notifies, SetLanguageMessageParams } from './dtos/notify.dto'
import { NotifiesService } from './notifies.service'

export const setLanguageMessage = async (params: SetLanguageMessageParams) => {
    const notifiesService = new NotifiesService()
    const language = params.user ? params.user.language : params.language ? params.language : 'ru'
    const notifies: Notifies = {}

    for (let i = 0; i < params.serviceName.length; i++) {
        await notifiesService.init(language, params.serviceName[i])
        const msg = await notifiesService.notify(params.type)
        notifies[params.serviceName[i]] = msg.messages
    }
    return { ...notifies }
}
