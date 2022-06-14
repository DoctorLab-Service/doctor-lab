import { Args, Resolver } from '@nestjs/graphql'
import { LoginInput, LoginOutput } from './dtos/login.dto'
import { LogoutInput, LogoutOutput } from './dtos/logout.dto'

@Resolver()
export class AuthResolver {
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return { ok: true, token: null }
    }
    async logout(@Args('input') loginInput: LogoutInput): Promise<LogoutOutput> {
        return { ok: true }
    }
}
