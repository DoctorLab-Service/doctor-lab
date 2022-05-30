import * as Joi from 'joi'
import { VerifyEmail } from './users/entities/verify-email.entity'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from './common/common.module'
import { User } from './users/entities/user.entity'
import { VerifyPhone } from './users/entities/verify-phone.entity'
import { UsersModule } from './users/users.module'
import { NotifiesModule } from './notifies/notifies.module'
import { JwtModule } from './jwt/jwt.module'
import { JwtMiddleware } from './jwt/jwt.middleware'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.test',
            ignoreEnvFile: process.env.NODE_ENV === 'production',
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production').required(),
                PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORDS: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                PRIVATE_KEY: Joi.string().required(),
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
            entities: [User, VerifyEmail, VerifyPhone],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            path: 'users', // http;//localhost:8001/users
            autoSchemaFile: true,
            context: ({ req }) => ({
                user: req['user'], // set req['user'] to context for graphql resolvers
            }),
        }),
        JwtModule.forRoot({
            privateKey: process.env.PRIVATE_KEY, // Using for creating token on jwt.service
        }),
        UsersModule,
        CommonModule,
        NotifiesModule,
        //JWT module is  a custom module for this project
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    // Set middleware for authorization for all graphql post request
    // V-1 for using or use on main.ts like use(
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '/users',
            method: RequestMethod.ALL,
        })
    }
}
