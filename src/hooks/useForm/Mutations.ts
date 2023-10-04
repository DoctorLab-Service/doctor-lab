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
    MUTATION_VERIFICATION_PASSWORD_RECOVERY,
} from "./graphql"
import { Form, Mutations as IMutations } from "types"
import { useAuth, usePaths, useRoles, useValidation } from "hooks"
import { getGraphQLErrors } from "core/graphql"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useTranslate } from "utils/languages"
import { setConfirmEmail, useAppDispatch } from "store"



export const Mutations = (form: Form, validate: any = {}): IMutations => {
    const { translation: 
        {
            login,
            verificationPhone,
            passwordRecoveryCode,
            verificationPasswordRecovery,
            createAccount,
            createHelpMessage,
            changePassword
        }
    } = useTranslate('success', [
        ['login', false],
        ['verificationPhone', false],
        ['passwordRecoveryCode', false],
        ['verificationPasswordRecovery', false],
        ['createAccount', false],
        ['createHelpMessage', false],
        ['changePassword', false],
    ])

    const { setToken } = useAuth()
    const { currentRole } = useRoles()
    const [ provider, setProvider ] = useState('')
    const [currentToken, setCurrentToken] = useState(undefined)
    const { paths, page: { isLogin }, pathname, navigate, state, setState, search } = usePaths()

    // Redux Store 
    const dispatch = useAppDispatch()

    useEffect(() => {
        setProvider(state && state.fields && state.fields.provider ? state.fields.provider : 'facebookId')
    }, [state])

    const { authentication } = useAuth()

    // Validation
    const { isEmail, isPhone } = useValidation()

    // Set Errors on state and toast it
    const setErrors = (errors: any) => {
        console.log(errors[Object.keys(errors)[0]], errors[Object.keys(errors)[1]])
        const key = isLogin &&
            (Object.keys(errors)[0] === 'email' || Object.keys(errors)[0] === 'phone')
                ? 'login' 
                : Object.keys(errors)[0]
                
        // Set Errors In Redux State
        setState({
            ...state,
            errors: {
                [key]: {
                    status: false,
                    message: errors[Object.keys(errors)[0]]
                }
            }
        })
        navigate(pathname)

        toast.error(errors[Object.keys(errors)[0]])
    } 

    // MUTATIONS
    // Login Mutationv 
    const [_login, { loading: loginLoading }] = useMutation<LoginOutput, LoginInput>(MUTATION_LOGIN, {
        onCompleted(data) {
            const {ok, accessToken} = data['login']
            if (ok && accessToken) {
                toast.success(login)
                setTimeout(() => authentication(accessToken || ''),3000)
            } 

            return 
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                setErrors(errors)
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
    const [_createAccount, { loading: createAccountLoading, }] = useMutation<CreateAccountOutput, CreateAccountInput>(MUTATION_CREATE_ACCOUNT, {
        onCompleted(data) {
            const { ok, accessToken } = data['createAccount']
            if (ok && accessToken) {
                setCurrentToken(accessToken)
                toast.success(createAccount)

                setState({ validate, accessToken })
                navigate(paths.verification.phone)

            }
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            console.log(err)
            if (err.graphQLErrors[0]) {
                setErrors(errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            email: form ? form.email : '',
            fullname: form ? form.fullname : '',
            phone: form ? form.phone : '',
            password: form ? form.password : '',
            rePassword: form ? form.rePassword : '',
            [provider]: state && state.fields ? state?.fields[provider] : undefined,
            role: currentRole.key,
        }
    })
    
    // CreateHelpMessage Mutation
    const [_createHelpMessage, { loading: createHelpMessageLoading, }] = useMutation<CreateHelpMessageOutput, CreateHelpMessageInput>(MUTATION_CREATE_HELP_MESSAGE, {
        onCompleted(data) {
            const { ok } = data['createHelpMessage']
            if (ok) {
                toast.success(createHelpMessage)
            }
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                setErrors(errors)
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            email: form && form.email,
            fullname: form && form.fullname,
            text: form && form.message  ,
            title: form && form.subject,
        }
    })

    // VerificationPhone Mutation
    const [_verificationPhone, { loading: verificationPhoneLoading, }] = useMutation<VerificationOutput, VerificationInput>(MUTATION_VERIFICATION_PHONE, {
        onCompleted(data) {
            const { ok } = data['verificationPhone']
            if (ok) {
                toast.success(verificationPhone)
                setTimeout(() => authentication(currentToken || ''), 3000)
            } 
            
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors) {
                setErrors(errors)
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            code: form && form.code,
        }
    })

    // PasswordRecoveryCode Mutation * SEND CODE TO EMAIL
    const [_passwordRecoveryCode, { loading: passwordRecoveryCodeLoading, }] = useMutation<RecoveryOutput, PasswordRecoveryCodeInput>(MUTATION_PASSWORD_RECOVERY_CODE, {
        onCompleted(data) {
            const { ok } = data['passwordRecoveryCode']
            if (ok) {
                dispatch(setConfirmEmail({ condition: 'sended' }))
                toast.success(passwordRecoveryCode)
            }
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors) {
                // Set Errors is it exists
                setErrors(errors)
                console.log('err.graphQLErrors[0]', errors)
            } else {
                setErrors(errors)
                console.log('errors', errors)
            }
        },
        variables: {
            email: form && form.email,
        }
    })

    // VerificationPasswordRecovery Mutation * VERIFICATION
    const [_verificationPasswordRecovery, { loading: verificationPasswordRecoveryLoading, }] = useMutation<VerificationOutput, VerificationInput>(MUTATION_VERIFICATION_PASSWORD_RECOVERY, {
        onCompleted(data) {
            const { ok, token } = data['verificationPasswordRecovery']
            if (ok && token) {
                setToken(token)
                toast.success(verificationPasswordRecovery)

                // Set condition: 'complited' and redirect to change password
                dispatch(setConfirmEmail({
                    condition: 'complited'
                }))
                setTimeout(() => {
                    navigate(paths.cahnge.password)
                }, 3000)
            }
            
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors) {
                dispatch(setConfirmEmail({ status: false, condition: 'failed' }))
                setErrors(errors)
                console.log('err.graphQLErrors[0]', errors)
            } else {
                dispatch(setConfirmEmail({ status: false, condition: 'failed' }))
                setErrors(errors)
                console.log('errors', errors)
            }
        },
        variables: {
            code: String(search.split('?')[1]),
        }
    })

    // ChangePassword Mutation * CHANGE PASSWORD
    const [_changePassword, { loading: changePasswordLoading, }] = useMutation<ChangeOutput, ChangePasswordInput>(MUTATION_CHANGE_PASSWORD, {
        onCompleted(data) {
            const { ok } = data['changePassword']
            if (ok) {
                toast.success(changePassword)
                setTimeout(() => {
                    dispatch(setConfirmEmail({
                        status: false,
                        confirm: false,
                        condition: 'finished',
                    }))
                    navigate(paths.login)
                }, 3000)
            }
            
            return
        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                setErrors(errors)
                console.log('err.graphQLErrors[0]', errors)
            } else {
                console.log('errors', errors)
            }
        },
        variables: {
            password: form ? form.password : '',
            rePassword: form ? form.rePassword : '',
        }
    })

    return {
        mutations: {
            login: {
                mutation: _login,
                loading: loginLoading,
            },
            createAccount: {
                mutation: _createAccount,
                loading: createAccountLoading,
            },
            createHelpMessage: {
                mutation: _createHelpMessage,
                loading: createHelpMessageLoading,
            },
            verificationPhone: {
                mutation: _verificationPhone,
                loading: verificationPhoneLoading,
            },
            passwordRecoveryCode: {
                mutation: _passwordRecoveryCode,
                loading: passwordRecoveryCodeLoading,
            },
            verificationPasswordRecovery: {
                mutation: _verificationPasswordRecovery,
                loading: verificationPasswordRecoveryLoading,
            },
            changePassword: {
                mutation: _changePassword,
                loading: changePasswordLoading,
            },
        },
        setErrors,
    }

}