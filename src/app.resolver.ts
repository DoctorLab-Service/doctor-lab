import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class AppResolvers {
    @Query(() => String)
    sayHello(): string {
        return 'Hello'
    }
}
