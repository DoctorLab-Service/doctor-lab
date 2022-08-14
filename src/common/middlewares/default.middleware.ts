import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { RolesService } from 'src/roles/roles.service'
import { LanguageService } from 'src/language/language.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class DefaultRolesMiddleware implements NestMiddleware {
    constructor(
        private readonly roleService: RolesService,
        private readonly userService: UsersService,
        private readonly languageService: LanguageService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            await this.roleService._deffaultRoles()
            await this.userService._createSystemUser()
            next()
        } catch (error) {
            console.log(error)
            next(new Error(await this.languageService.setError(['isNot', 'createRole'])))
        }
    }
}
