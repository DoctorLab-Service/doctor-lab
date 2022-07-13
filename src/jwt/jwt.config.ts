import { CookieOptions } from 'express'
import { TokenConfig } from './types'

export const REFRESH_TOKEN = 'refreshToken'
export const JWT_TOKEN = 'x-jwt'

export const cookieOptions: CookieOptions = {
    domain: 'localhost', // <- Change to your client domain
    secure: process.env.NODE_ENV === 'production', // <- Should be true if !development
    // sameSite: 'strict',
    httpOnly: true,
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
}

export const tokenConfig: TokenConfig = {
    access: {
        expiresIn: '12h',
    },
    refresh: {
        expiresIn: '30d',
    },
}
