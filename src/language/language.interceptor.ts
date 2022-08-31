import { ELanguage } from './dtos/languages.dto'
import { LanguageService } from './language.service'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LenguageInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctxGql = GqlExecutionContext.create(context)
        const ctx = ctxGql.getContext()
        // Get Language
        let lng: LanguageService
        ctx ? (lng = new LanguageService(ctx)) : (lng = new LanguageService(undefined, ELanguage.EN))
        const body = ctxGql.getArgs()
        body && body.input
            ? !body.input.language
                ? (body.input.language = lng.language())
                : body.input.language
            : !body.language
            ? (body.input.language = lng.language())
            : body.language

        return next.handle()
    }
}
