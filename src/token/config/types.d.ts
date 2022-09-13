export interface TokenConfig {
    recovery: { expiresIn: string }
    access: { expiresIn: string }
    refresh: { expiresIn: string }
}

export interface TokenModuleOptions {
    accessSecret: string
    recoverySecret: string
    refreshSecret: string
}

export interface GenerateTokens {
    accessToken: string
    recoveryToken?: string
    refreshToken: string
}
