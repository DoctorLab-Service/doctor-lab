import { useMutation } from "@apollo/client"
import {
    ChangePasswordInput,
    ChangeOutput,
    CreateAccountInput,
    CreateAccountOutput,
    CreateHelpMessageInput,
    CreateHelpMessageOutput,
    LoginOutput,
    LoginInput,
    VerificationInput,
    VerificationOutput,
    PasswordRecoveryCodeInput,
    RecoveryOutput,
} from "types/api"
import {
    MUTATION_LOGIN,
    MUTATION_CREATE_ACCOUNT,
    MUTATION_CREATE_HELP_MESSAGE,
    MUTATION_CHANGE_PASSWORD,
    MUTATION_VERIFICATION_PHONE,
    MUTATION_PASSWORD_RECOVERY_CODE,
} from "./graphql"
import { Form, Mutations as IMutations } from "types"
import { useAuth, usePaths, useRoles, useValidation } from "hooks"
import { getGraphQLErrors } from "core/graphql"
import { toast } from "react-toastify"
import { useState } from "react"



export const Mutations = (form: Form): IMutations => {
    const [token, setToken] = useState(undefined)
    const { currentRole } = useRoles()
    const { pagename, pathname, navigate, state } = usePaths()
    
    const { authentication } = useAuth()

    // Validation
    const { isEmail, isPhone } = useValidation()


    // MUTATIONS
    // Login Mutationv 
    const [_login, { loading: loginLoading }] = useMutation<LoginOutput, LoginInput>(MUTATION_LOGIN, {
        onCompleted(data) {
            const {ok, accessToken} = data['login']
            if (ok && accessToken) {
                authentication(accessToken || '')
                console.log('Hello username, you login successfully')
            } 

            return 
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                console.log('err.graphQLErrors[0]', errors)
                toast.error(errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            email: isEmail(form.login) ? form.login : isPhone(form.login) ? undefined : form.login,
            phone: isPhone(form.login) ? form.login : undefined,
            password: form.password,
            role: currentRole.key
        }
    })

    // CreateAccount Mutation
    const [_createAccount, { loading: registerLoading, }] = useMutation<CreateAccountOutput, CreateAccountInput>(MUTATION_CREATE_ACCOUNT, {
        onCompleted(data) {
            const { ok, accessToken } = data['createAccount']
            if (ok && accessToken) {
                setToken(accessToken)
                navigate(pathname, { state: { fields: { ...state }, accessToken } })

            }
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            email: form ? form.email : '',
            fullname: form ? form.fullname : '',
            phone: form ? form.phone : '',
            password: form ? form.password : '',
            rePassword: form ? form.confirmPassword : '',
            [state?.fields?.provider]: state?.fields[state.fields.provider],
            role: currentRole.key,
        }
    })

    // PasswordRecoveryCode Mutation
    const [_passwordRecoveryCode, { loading: passwordRecoveryCodeLoading, }] = useMutation<RecoveryOutput, PasswordRecoveryCodeInput>(MUTATION_PASSWORD_RECOVERY_CODE, {
        onCompleted(data) {
            const { ok } = data['passwordRecoveryCode']
            if (ok) {
                console.log('SEND EMAIL, AND SERCER REDIRECT TO FORM')
            }
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            email: form && form.email,
        }
    })
    
    // CreateHelpMessage Mutation
    const [_createHelpMessage, { loading: createHelpMessageLoading, }] = useMutation<CreateHelpMessageOutput, CreateHelpMessageInput>(MUTATION_CREATE_HELP_MESSAGE, {
        onCompleted(data) {
            const { ok } = data['createHelpMessage']
            if (ok) {
                console.log('Your message has been successfully sent')
            }
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            email: form && form.email,
            fullname: form && form.fullname,
            text: form && form.text,
            title: form && form.subject,
        }
    })

    // VerificationPhone Mutation
    const [_verificationPhone, { loading: verificationPhoneLoading, }] = useMutation<VerificationOutput, VerificationInput>(MUTATION_VERIFICATION_PHONE, {
        onCompleted(data) {
            const { ok } = data['verificationPhone']
            if (ok) {
                console.log('You have successfully verified your phone number')
                setTimeout(() => authentication(token || ''),3000)
                
            } 
            
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors) {
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            code: form && form.code,
        }
    })

    // ChangePassword Mutation
    const [_changePassword, { loading: changePasswordLoading, }] = useMutation<ChangeOutput, ChangePasswordInput>(MUTATION_CHANGE_PASSWORD, {
        onCompleted(data) {
            const { ok } = data['changePassword']
            if (ok) {
                console.log('Your password is changed')
            }
            
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            password: form ? form.password : '',
            rePassword: form ? form.confirmPassword : '',
        }
    })
    

    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'

    const loading: boolean = isLogin 
        ? loginLoading : isRegister 
        ? registerLoading : isForgot
        ? passwordRecoveryCodeLoading : isSupport
        ? createHelpMessageLoading : isVerification
        ? verificationPhoneLoading : isChangePassword
        ? changePasswordLoading : false

    return {
        mutation: {
            _login,
            _createAccount,
            _passwordRecoveryCode,
            _createHelpMessage,
            _verificationPhone,
            _changePassword,
        },
        loading,
    }
}