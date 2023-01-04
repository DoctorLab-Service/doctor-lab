import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto'
import { DeleteAccountOutput } from '../dtos/delete-account.dto'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { AccessTokenCookieInterceptor, ClearTokenCookieInterceptor } from 'src/token/interceptors'
import { LenguageInterceptor } from 'src/language/language.interceptor'
import { UsersService } from '../users.service'
import { ChangeOutput, ChangeEmailInput, ChangePasswordInput, ChangePhoneInput } from '../dtos'

@Resolver()
@UseInterceptors(new LenguageInterceptor())
export class UsersMutations {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => CreateAccountOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    @UsePipes(new ValidationPipe('users'))
    async createAccount(@Args('input') body: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(body)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UpdateAccountOutput)
    @UsePipes(new ValidationPipe('users'))
    async updateAccount(
        @Args('input') body: UpdateAccountInput,
        @Args({ name: 'file', nullable: true, type: () => GraphQLUpload }) file: FileUpload | null,
        @Context() context: any,
    ): Promise<UpdateAccountOutput> {
        console.log('file', file)
        return this.usersService.updateAccount(body, file, context)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => DeleteAccountOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async deleteAccount(@Context() context: any): Promise<DeleteAccountOutput> {
        return this.usersService.deleteAccount(context)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ChangeOutput)
    @UsePipes(new ValidationPipe('users'))
    async changeEmail(@Args('input') body: ChangeEmailInput, @Context() context: any): Promise<ChangeOutput> {
        return this.usersService.changeEmail(body, context)
    }

    // @UseGuards(AuthGuard)
    @Mutation(() => ChangeOutput)
    @UsePipes(new ValidationPipe('users'))
    async changePassword(@Args('input') body: ChangePasswordInput, @Context() context: any): Promise<ChangeOutput> {
        return this.usersService.changePassword(body, context)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ChangeOutput)
    @UsePipes(new ValidationPipe('users'))
    async changePhone(@Args('input') body: ChangePhoneInput, @Context() context: any): Promise<ChangeOutput> {
        return this.usersService.changePhone(body, context)
    }
}
