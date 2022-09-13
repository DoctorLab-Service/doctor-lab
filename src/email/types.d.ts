export interface MailModuleOptions {
    apiKey: string
    fromEmail: string
    suportEmail?: string
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

export interface EmailParams {
    to?: string
    from?: string
    fullname?: string
    subject?: string
    text?: string
    changedData?: string
    code?: string
}
