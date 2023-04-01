import { TokenMiddleware } from './token/middlewares/token.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import * as Joi from 'joi'
import { TokenModule } from './token/token.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { VerificationsModule } from './verifications/verifications.module'
import { EmailModule } from './email/email.module'
import { PhoneModule } from './phone/phone.module'
import { LanguageModule } from './language/language.module'
import { FilesModule } from './files/files.module'
import { RolesModule } from './roles/roles.module'
import { DefaultMiddleware } from './common/middlewares/default.middleware'
import { Role, UserRoles } from './roles/entities'
import { User } from './users/entities'
import { ConfirmEmail, ConfirmPhone, VerificationEmail, VerificationPhone } from './verifications/entities'
import { Token } from './token/entities'
import { HelpModule } from './help/help.module'
import { HelpAnswer, HelpMessage } from './help/entities'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production').required(),

                SERVER_PORT: Joi.number().required(),
                SERVER_HOST: Joi.string().required(),

                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORDS: Joi.string().required(),
                DB_NAME: Joi.string().required(),

                TOKEN_ACCESS_SECRET: Joi.string().required(),
                TOKEN_RECOVERY_SECRET: Joi.string().required(),
                TOKEN_REFRESH_SECRET: Joi.string().required(),

                SENDGRID_API_KEY: Joi.string().required(),
                SENDGRID_FROM_EMAIL: Joi.string().required(),
                SENDGRID_SUPORT_EMAIL: Joi.string().required(),

                CLOUDINARY_API_KEY: Joi.number().required(),
                CLOUDINARY_API_SECRET: Joi.string().required(),
                CLOUDINARY_CLOUD_NAME: Joi.string().required(),
                CLOUDINARY_UPLOAD_PRESET: Joi.string().required(),
                CLOUDINARY_API_URL: Joi.string().required(),
                CLOUDINARY_URL: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORDS,
            database: process.env.DB_NAME,
            // synchronize: process.env.NODE_ENV !== 'production',
            synchronize: true, // Auto create entities on database
            logging: process.env.NODE_ENV !== 'production',
            entities: [
                User,
                Token,
                VerificationEmail,
                VerificationPhone,
                Role,
                UserRoles,
                ConfirmEmail,
                ConfirmPhone,
                HelpMessage,
                HelpAnswer,
            ],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            cors: false,
            path: 'auth',
            autoSchemaFile: true,
            playground: true,
            introspection: true,
            persistedQueries: false,
            context: ({ req, res }) => ({ req, res }),
            // formatError: (error: GraphQLError | any) => {
            //     const graphQLFormattedError: GraphQLFormattedError = {
            //         message: error.extensions?.exception?.response || error.message,
            //     }
            //     return process.env.NODE_ENV !== 'production' ? graphQLFormattedError : error
            // },
        }),
        TokenModule.forRoot({
            accessSecret: process.env.TOKEN_ACCESS_SECRET,
            recoverySecret: process.env.TOKEN_RECOVERY_SECRET,
            refreshSecret: process.env.TOKEN_REFRESH_SECRET,
        }),
        EmailModule.forRoot({
            apiKey: process.env.SENDGRID_API_KEY,
            fromEmail: process.env.SENDGRID_FROM_EMAIL,
            suportEmail: process.env.SENDGRID_SUPORT_EMAIL,
        }),
        FilesModule.forRoot({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true, // true if https
        }),
        UsersModule,
        CommonModule,
        AuthModule,
        VerificationsModule,
        PhoneModule,
        LanguageModule,
        RolesModule,
        HelpModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DefaultMiddleware, TokenMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        })
    }
}
