export interface MailModuleOptions {
    apiKey: string
    fromEmail: string
}

export type MailMessage = {
    to: string
    from: string
    subject: string
    text?: string
    html?: string
}

export interface DefaultMailParams {
    path?: string
    title?: string
    emailTitle?: string
    content?: string
    button?: string
}

export interface CustomMailParams {
    readonly [key: string]: string
}
