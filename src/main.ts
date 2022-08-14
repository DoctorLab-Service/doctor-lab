import { graphqlUploadExpress } from 'graphql-upload'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: true,
        credentials: true,
    })
    app.use(cookieParser())
    app.use(graphqlUploadExpress())

    // Interceptors
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))) // Interceptor for @Exclude({ toPlainOnly: true })
    await app.listen(8000)
}
bootstrap()
