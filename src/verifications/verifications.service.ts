import { Injectable, Inject, ForbiddenException } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { relationsConfig } from 'src/common/configs'
import { EmailService } from 'src/email/email.service'
import { ValidationException } from 'src/exceptions'
import { TokenService } from 'src/token/token.service'
import { LanguageService } from 'src/language/language.service'
import { PhoneService } from 'src/phone/phone.service'
import { User } from 'src/users/entities'
import { EResetKey } from 'src/users/config/users.enum'
import { Repository } from 'typeorm'
import {
    ChangeOutputCode,
    VerificationInput,
    VerificationOutput,
    PasswordRecoveryCodeInput,
    RecoveryOutput,
} from './dtos'
import { VerificationEmail, VerificationPhone, ConfirmEmail, ConfirmPhone } from './entities'
import { EConfirmCodeKey } from './verifications.enums'
import { Token } from 'src/token/entities'

@Injectable()
export class VerificationsService {
    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Token) private readonly tokens: Repository<Token>,
        @InjectRepository(VerificationEmail) private readonly verifyEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verifyPhone: Repository<VerificationPhone>,
        @InjectRepository(ConfirmEmail) private readonly confirmEmail: Repository<ConfirmEmail>,
        @InjectRepository(ConfirmPhone) private readonly confirmPhone: Repository<ConfirmPhone>,
        private readonly languageService: LanguageService,
        private readonly phoneService: PhoneService,
        private readonly emailService: EmailService,
        private readonly tokenService: TokenService,
    ) {}

    /**
     * Verrification code, send email
     * @param user: User
     */
    async verificationEmailCode(user: User): Promise<boolean> {
        // If code exists delete
        const codes = await this.verifyEmail.find({ ...relationsConfig.verifications })
        const existCode = codes.filter(code => code.user.id === user.id)

        if (existCode.length) {
            await this.verifyEmail.delete(existCode[0].id)
        }

        // Create Code for email and phone
        const codeEmail = await this.verifyEmail.save(this.verifyEmail.create({ user }))
        let sendedCode = false

        // Send verification on email and phone
        if (codeEmail) {
            sendedCode = await this.emailService.sendVerificationEmail({
                to: user.email,
                fullname: user.fullname,
                code: codeEmail.code,
            })
        } else {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendEmail']),
            })
        }

        return sendedCode
    }

    /**
     * Verification code, send sms
     * @param user: User
     */
    async verificationPhoneCode(user: User): Promise<boolean> {
        // If code exists delete
        const codes = await this.verifyPhone.find({ ...relationsConfig.verifications })
        const existCode = codes.filter(code => code.user.id === user.id)

        if (existCode.length) {
            await this.verifyPhone.delete(existCode[0].id)
        }

        // Create Code for phone
        const codePhone = await this.verifyPhone.save(this.verifyPhone.create({ user }))
        let sendedCode = false

        // Send verification  phone
        if (codePhone) {
            // * SEND SMS
            // sendedCode = await this.phoneService.sendVerificationSMS(user.phone, codePhone.code)
            sendedCode = true
        } else {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendSMS']),
            })
        }
        return sendedCode
    }

    /**
     * Confirm code, send sms or email
     * @param body phone number or email
     */
    async passwordRecoveryCode(body: PasswordRecoveryCodeInput): Promise<RecoveryOutput> {
        if (body) {
            /*
                If Recovery Code with email
            */
            if (body.email) {
                // Check to existing user
                const user = await this.users.findOne({ where: { email: body.email } })
                if (!user) {
                    throw new ValidationException({
                        email: await this.languageService.setError(['isNotExist', 'email'], 'users'),
                    })
                }

                // Check to exits code
                // Delete if code is exists
                const existsCode = await this.confirmEmail.findOne({
                    where: { email: body.email, key: EConfirmCodeKey.recovery_password },
                })
                if (existsCode) {
                    await this.confirmEmail.delete({ email: body.email, key: EConfirmCodeKey.recovery_password })
                }

                // Create new code
                const code = await this.confirmEmail.save(
                    this.confirmEmail.create({ email: body.email, key: EConfirmCodeKey.recovery_password }),
                )
                if (!code) {
                    throw new ValidationException({
                        no_send: await this.languageService.setError(['isNotVerify', 'noSendEmail'], 'verify'),
                    })
                }

                // Send mail to body.email
                const sendedEmail = await this.emailService.sendPasswordRecovery({
                    to: user.email,
                    code: code.code,
                })
                return { ok: Boolean(sendedEmail) }
            }

            /*
                If Recovery Code with phone
            */
            if (body.phone) {
                // Check to existing user
                const user = await this.users.findOne({ where: { phone: body.phone } })
                if (!user) {
                    throw new ValidationException({
                        phone: await this.languageService.setError(['isNotExist', 'phone'], 'users'),
                    })
                }

                // Check to exits code
                // Delete if code is exists
                const existsCode = await this.confirmPhone.findOne({
                    where: { phone: body.phone, key: EConfirmCodeKey.recovery_password },
                })
                if (existsCode) {
                    await this.confirmPhone.delete({ phone: body.phone, key: EConfirmCodeKey.recovery_password })
                }

                // Create new code
                const code = await this.confirmPhone.save(
                    this.confirmPhone.create({ phone: body.phone, key: EConfirmCodeKey.recovery_password }),
                )
                if (!code) {
                    throw new ValidationException({
                        no_send: await this.languageService.setError(['isNotVerify', 'noSendSMS'], 'verify'),
                    })
                }

                // Send mail to body.sms
                // const sendedSms = await this.phoneService.sendPasswordRecoverySMS(user.phone, code.code)
                // return { ok: Boolean(sendedSms) }
                return { ok: true }
            }
        }

        throw new ValidationException({
            no_send: await this.languageService.setError(['isEmpty', 'fields'], 'verify'),
        })
    }

    /**
     *  Send current user email with code for change password
     */
    async changePasswordCode(): Promise<ChangeOutputCode> {
        const currentUser: User = await this.tokenService.getContextUser(this.context)

        // Check to exits code
        // Delete if code is exists
        const existsCode = await this.confirmPhone.findOne({
            where: { phone: currentUser.phone, key: EConfirmCodeKey.change_password },
        })
        if (existsCode) {
            await this.confirmPhone.delete({ phone: currentUser.phone, key: EConfirmCodeKey.change_password })
        }

        // Create new code
        const code = await this.confirmPhone.save(
            this.confirmPhone.create({ phone: currentUser.phone, key: EConfirmCodeKey.change_password }),
        )
        if (!code) {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendSMS'], 'verify'),
            })
        }

        // Send mail to body.Sms
        // const sendedSms = await this.phoneService.sendChangePasswordSMS(currentUser.phone, code.code)
        // return { ok: Boolean(sendedSms) }
        return { ok: Boolean(true) }
    }

    /**
     * Send code on current user email for change email
     */
    async changeEmailCode(): Promise<ChangeOutputCode> {
        const currentUser: User = await this.tokenService.getContextUser(this.context)

        // Check to exits code
        // Delete if code is exists
        const existsCode = await this.confirmEmail.findOne({
            where: { email: currentUser.email, key: EConfirmCodeKey.change_email },
        })
        if (existsCode) {
            await this.confirmEmail.delete({ email: currentUser.email, key: EConfirmCodeKey.change_email })
        }

        // Create new code
        const code = await this.confirmEmail.save(
            this.confirmEmail.create({ email: currentUser.email, key: EConfirmCodeKey.change_email }),
        )
        if (!code) {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendEmail'], 'verify'),
            })
        }

        // Send mail to body.email
        const sendedEmail = await this.emailService.sendChangeEmail({
            to: currentUser.email,
            fullname: currentUser.fullname,
            code: code.code,
        })
        return { ok: Boolean(sendedEmail) }
    }

    /**
     * Send current user phone code for change phone
     */
    async changePhoneCode(): Promise<ChangeOutputCode> {
        const currentUser: User = await this.tokenService.getContextUser(this.context)

        // Check to exits code
        // Delete if code is exists
        const existsCode = await this.confirmPhone.findOne({
            where: { phone: currentUser.phone, key: EConfirmCodeKey.change_phone },
        })
        if (existsCode) {
            await this.confirmPhone.delete({ phone: currentUser.phone, key: EConfirmCodeKey.change_phone })
        }

        // Create new code
        const code = await this.confirmPhone.save(
            this.confirmPhone.create({ phone: currentUser.phone, key: EConfirmCodeKey.change_phone }),
        )
        if (!code) {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendSMS'], 'verify'),
            })
        }

        // Send mail to body.Sms
        // const sendedSms = await this.phoneService.sendVerificationSMS(currentUser.phone, code.code)
        // return { ok: Boolean(sendedSms) }
        return { ok: Boolean(true) }
    }

    /**
     * Verification phone by code
     * @param body code
     */
    async verificationEmail({ code }: VerificationInput): Promise<VerificationOutput> {
        const verification = await this.verifyEmail.findOne({ where: { code }, ...relationsConfig.verifications })

        if (!verification) {
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            verification.user.verifiedEmail = true
            await this.users.save(verification.user)
            await this.verifyEmail.delete(verification.id)

            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification phone by code
     * @param body code
     */
    async verificationPhone({ code }: VerificationInput): Promise<VerificationOutput> {
        const verification = await this.verifyPhone.findOne({ where: { code }, ...relationsConfig.verifications })

        if (!verification)
            throw new ValidationException({
                phone: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })

        try {
            verification.user.verifiedPhone = true
            await this.users.save(verification.user)
            await this.verifyPhone.delete(verification.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                phone: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification password recovery by code
     * @param body code
     */
    async verificationPasswordRecovery({ code }: VerificationInput): Promise<VerificationOutput> {
        // Max phone code length
        const codeLengts = 6

        // Check code in database
        const existsCode = await this[code.length <= codeLengts ? 'confirmPhone' : 'confirmEmail'].findOne({
            where: { code, key: EConfirmCodeKey.recovery_password },
        })

        // Check existsCode
        if (!existsCode) {
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        // Find user by  phone or email
        const user = await this.users.findOne({
            where: {
                [code.length <= codeLengts ? 'phone' : 'email']:
                    existsCode[code.length <= codeLengts ? 'phone' : 'email'],
            },
            ...relationsConfig.users,
        })

        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(
                    ['isNotExist', code.length <= codeLengts ? 'phone' : 'email'],
                    'users',
                ),
            })
        }

        try {
            // Delete code
            const deletedCode = await this[code.length <= codeLengts ? 'confirmPhone' : 'confirmEmail'].delete({
                code,
                key: EConfirmCodeKey.recovery_password,
            })

            // Set reset key  for user
            user.resetKey = EResetKey.password
            await this.users.save(user)

            // Create token
            const token = await this.tokenService.generateTokens({ id: user.id }, true)

            // Check to exists tokens for this user
            await this.tokenService.removeTokenByUserId(user.id)
            // Save token in database
            await this.tokenService.saveTokens(user, { recoveryToken: token.recoveryToken })
            // await this.tokens.save(this.tokens.create({ recoveryToken: token.recoveryToken, user }))

            return { ok: Boolean(deletedCode.affected > 0), token: token.recoveryToken }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification change password by code
     * @param body code
     */
    async verificationChangePassword({ code }: VerificationInput): Promise<VerificationOutput> {
        // Get user and check it
        const currentUser: User = await this.tokenService.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check existing to code in database
        const existsCode = await this.confirmPhone.findOne({
            where: { code, phone: user.phone, key: EConfirmCodeKey.change_password },
        })

        if (!existsCode) {
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            user.resetKey = EResetKey.password
            await this.users.save(user)

            // Delete code
            // const deletedCode = await this.confirmPhone.delete({ code, key: EConfirmCodeKey.change_password })
            // return { ok: Boolean(deletedCode.affected > 0) }
            return { ok: Boolean(true) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification change email by code
     * @param body code
     */
    async verificationChangeEmail({ code }: VerificationInput): Promise<VerificationOutput> {
        // Get user and check it
        const currentUser: User = await this.tokenService.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check existing to code in database
        const existsCode = await this.confirmEmail.findOne({
            where: { code, email: user.email, key: EConfirmCodeKey.change_email },
        })
        if (!existsCode) {
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            user.resetKey = EResetKey.email
            await this.users.save(user)

            // Delete code
            const deletedCode = await this.confirmEmail.delete({ code, key: EConfirmCodeKey.change_email })
            return { ok: Boolean(deletedCode.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification change phone by code
     * @param body code
     */
    async verificationChangePhone({ code }: VerificationInput): Promise<VerificationOutput> {
        // Get user and check it
        const currentUser: User = await this.tokenService.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check existing to code in database
        const existsCode = await this.confirmPhone.findOne({
            where: { code, phone: user.phone, key: EConfirmCodeKey.change_phone },
        })
        if (!existsCode) {
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            user.resetKey = EResetKey.phone
            await this.users.save(user)

            // Delete code
            const deletedCode = await this.confirmPhone.delete({ code, key: EConfirmCodeKey.change_phone })
            return { ok: Boolean(deletedCode.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }
}
