import * as jwt from 'jsonwebtoken'
import { CONFIG_OPTIONS } from './../common/common.constants'
import { Inject, Injectable } from '@nestjs/common'
import { IJwtModuleOptions } from './jwt.interfaces'

@Injectable()
export class JwtService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: IJwtModuleOptions) {}
    //private readonly config: ConfigService // We  can use this  to configure

    sign(payload: object): string {
        return jwt.sign(payload, this.options.privateKey)
        //return jwt.sign(payload, this.config.get('PRIVATE_KEY')) // If use config service
    }

    verify(token: string) {
        return jwt.verify(token, this.options.privateKey)
    }
}
