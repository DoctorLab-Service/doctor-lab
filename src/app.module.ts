import { JwtMiddleware } from './jwt/jwt.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import * as Joi from 'joi'
import { JwtModule } from './jwt/jwt.module'
import { Token } from './jwt/entities/token.entity'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'
import { AuthModule } from './auth/auth.module'
import { VerificationsModule } from './verifications/verifications.module'
import { EmailModule } from './email/email.module'
import { PhoneModule } from './phone/phone.module'
import { VerificationEmail } from './verifications/entities/verification-email.entiry'
import { VerificationPhone } from './verifications/entities/verification-phone.entiry'
import { LanguageModule } from './language/language.module'
import { FilesModule } from './files/files.module'
import { RolesModule } from './roles/roles.module'
import { PermissionsModule } from './permissions/permissions.module'
import { Role } from './roles/entities/role.entity'
import { UserRoles } from './roles/entities/user_roles.entity'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.test',
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
                JWT_ACCESS_SECRET: Joi.string().required(),
                JWT_REFRESH_SECRET: Joi.string().required(),
                SENDGRID_API_KEY: Joi.string().required(),
                SENDGRID_EMAIL: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORDS,
            database: process.env.DB_NAME,
            synchronize: process.env.NODE_ENV !== 'production',
            logging: process.env.NODE_ENV !== 'production',
            entities: [User, Token, VerificationEmail, VerificationPhone, Role, UserRoles],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            cors: false,
            path: 'auth',
            autoSchemaFile: true,
            context: ({ req, res }) => ({ req, res }),
        }),
        UsersModule,
        CommonModule,
        JwtModule.forRoot({
            accessSecret: process.env.JWT_ACCESS_SECRET,
            refreshSecret: process.env.JWT_REFRESH_SECRET,
        }),
        AuthModule,
        VerificationsModule,
        EmailModule.forRoot({
            apiKey: process.env.SENDGRID_API_KEY,
            fromEmail: process.env.SENDGRID_EMAIL,
        }),
        PhoneModule,
        LanguageModule,
        FilesModule,
        RolesModule,
        PermissionsModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '/auth',
            method: RequestMethod.ALL,
        })
    }
}
