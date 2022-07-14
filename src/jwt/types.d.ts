export interface TokenConfig {
    access: { expiresIn: string }
    refresh: { expiresIn: string }
}

export interface JwtModuleOptions {
    accessSecret: string
    refreshSecret: string
}

export interface GenerateTokens {
    accessToken: string
    refreshToken: string
}
