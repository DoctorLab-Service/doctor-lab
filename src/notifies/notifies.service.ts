import { Injectable } from '@nestjs/common'
import { MassageDto, NotifyDto } from './dtos/notify.dto'

@Injectable()
export class NotifiesService {
    service: string
    lng: string
    type: string
    /**
     * Language notify
     * Notify of service
     */
    init(lng: string, service: string): string {
        this.lng = lng || 'ru'
        this.service = service
        return lng
    }

    async notify(type: string, name?: string): Promise<NotifyDto | MassageDto | any> {
        const data = await this.fetch(type)
        return name ? data.messages[name] : data
    }

    async fetch(type: string): Promise<NotifyDto> {
        const path = `./languages/${this.lng.toLowerCase()}/${this.service}.${type}`
        const importedData = await import(path)
        return importedData.notifies
    }
}
