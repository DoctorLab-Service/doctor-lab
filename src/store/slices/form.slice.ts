import { createSlice } from "@reduxjs/toolkit"
import {
    IConfirmEmailAction,
    IFormAction,
    IFormState,
    IIsChangePasswordFormAction,
    IStateAction,
    IValidateAction
} from "../types"
import { localStorageKey } from "core"
import { getPage } from "hooks/usePaths"

const initialState: IFormState = {
    defaultForm: {
        login: {
            login: '',
            password: '',
        },
        register: {
            fullname: '',
            email: '',
            phone: '',
            password: '',
            rePassword:  '',
        },
        support: {
            email: '',
            subject: '',
            message: '',
            fullname: '',
        },
        verification: {
            code: '',
        },
        forgot: {
            email: ''
        },
        changePassword: {
            password: '',
            rePassword: ''
        },
    },
    forms: {
        login: {
            login: '',
            password: '',
        },
        register: {
            fullname: '',
            email: '',
            phone: '',
            password: '',
            rePassword:  '',
        },
        support: {
            email: '',
            subject: '',
            message: '',
            fullname: '',
        },
        verification: {
            code: '',
        },
        forgot: {
            email: ''
        },
        changePassword: {
            password: '',
            rePassword: ''
        },

    },
    state: null,
    validate: {},
    confirmEmail: {
        confirm: false,
        status: false,
    },
    isChangePasswordForm: false,
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        // SET FORM DATA
        setForm: (state, action: IFormAction) => {
            const { forms, defaultForm } = state
            const { formName, form } = action.payload

            if (!form || (JSON.stringify(form) === '{}') || (!form.name && !form.value)) {
                return {
                ...state,
                forms: {
                    ...forms,
                    [formName]: defaultForm[formName],
                },
                validate: {},
                };
            }

            const updatedForm = {
                ...forms[formName],
                [form.name]: form.value,
            };

            return {
                ...state,
                forms: {
                ...forms,
                [formName]: updatedForm,
                },
            };

        },

        // SET VALIDATE
        setValidate: (state, action: IValidateAction) => {
            const { payload } = action
            const { validate } = state

            return {
                ...state,
                validate: {
                    ...validate,
                    ...payload
                }
            }
        },

        // SET STATE
        setState: (state, action: IStateAction) => {
            const { payload } = action
            return { 
                ...state,
                state: payload 
                    ? { ...state.state, ...payload}
                    : payload ,
            }

        },

         // SET CONFIRM PASSWORD
        setConfirmEmail: (state, action: IConfirmEmailAction) => {
            const {confirm: stateConfirm, status: stateStatus } = state.confirmEmail
            const {confirm: currentConfirm, status: currentStatus, condition: currentCondition } = action.payload

            const confirm = currentConfirm === undefined ? stateConfirm : currentConfirm
            const status = currentStatus === undefined ? stateStatus : currentStatus
            const condition = currentCondition || 'complited'

            if (condition === 'sended' || condition === 'complited' || condition === 'finished') {
                // Setting the cookie's expiration time in milliseconds (15 minutes) and create localStorage
                const expiration = Date.now() + 15 * 60 * 1000;
                window.localStorage.setItem(localStorageKey.request, JSON.stringify({condition, expiration }));

                condition === 'finished' && window.localStorage.removeItem(localStorageKey.request);
                return {
                    ...state,
                    confirmEmail: { status, confirm },
                };
            }

            // Remove localStorage if confirm === false 
            window.localStorage.removeItem(localStorageKey.request);

            return {
                ...state,
                confirmEmail: { status, confirm },
            };
        },

        // SET CHANGE PASSWORD
        checkIsChangePasswordForm: (state, action: IIsChangePasswordFormAction ) => {
            // Get localStorage
            const storedData  = window.localStorage.getItem(localStorageKey.request);
            const { isChangePassword } = getPage()

            if (storedData) {
                // Parsed storedData and get current time
                const { condition, expiration } = JSON.parse(storedData)
                const currentTime = Date.now();

                // Check to expiration or condition === failed, and remove storedData, if have any true
                if (currentTime > expiration || condition === 'finished') {
                    window.localStorage.removeItem(localStorageKey.request)
                    return {
                        ...state,
                        isChangePasswordForm: false,
                    };
                }


                if (condition === 'complited') {
                    return {
                        ...state,
                        isChangePasswordForm: isChangePassword
                    };
                }

                // Remove storedData if any condition is not matched and storedData is existing
                window.localStorage.removeItem(localStorageKey.request)
            }

            return {
                ...state,
                isChangePasswordForm: false
            }
        },
        
        // CHECK RECOVERY PASSWORD
        checkRecoveryPassword: (state, action: unknown) => {
            // Get localStorage
            const storedData  = window.localStorage.getItem(localStorageKey.request);

            if (storedData) {
                // Parsed storedData and get current time
                const { condition, expiration } = JSON.parse(storedData)
                const currentTime = Date.now();

                // Check to expiration or condition === failed, and remove storedData, if have any true
                if (currentTime > expiration) {
                    window.localStorage.removeItem(localStorageKey.request)
                    return {
                        ...state,
                        confirmEmail: {
                            status: state.confirmEmail.status,
                            confirm: false
                        },
                    };
                }

                // Chack successfully condition if any true
                if (condition === 'sended') {
                    return {
                        ...state,
                        confirmEmail: {
                            status: true,
                            confirm: true
                        },
                    };
                }
                
                // Chack successfully condition if any true
                if (condition === 'complited') {
                    return {
                        ...state,
                        confirmEmail: {
                            status: true,
                            confirm: false
                        },
                        isChangePasswordForm: true
                    };
                }

               

                if (condition === 'failed') {
                    window.localStorage.removeItem(localStorageKey.request)
                    return {
                        ...state,
                        confirmEmail: {
                            status: false,
                            confirm: false
                        },
                    };
                }

                // Remove storedData if any condition is not matched and storedData is existing
                window.localStorage.removeItem(localStorageKey.request)
            }

            return {
                ...state,
                confirmEmail: {
                    status: state.confirmEmail.status,
                    confirm: false
                },
            };
        },
    },
    extraReducers: (builder) => {}
})

export const {
    setForm,
    setState,
    setValidate,
    setConfirmEmail,
    checkRecoveryPassword,
    checkIsChangePasswordForm,
} = formSlice.actions

export default formSlice.reducer
