import { useMemo, useState } from 'react'
import { Form, UseValidation } from 'types'
import { useTranslate } from 'utils/languages'


export const useValidation = (): UseValidation => {
    const [validate, setValidate] = useState<Record<string, any>>({})

    const [form, setForm] = useState<Record<string, Form>>({})

    const { translation: { empty, password, phone, email, fullname } } = useTranslate('errors', [
        ['empty', true], ['password', true], ['phone', true], ['email', true], ['fullname', true]
    ])

    // REGEXP
    const REGEX_MAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const REGEX_PHONE = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const REGEX_ONLY_NUMBER = /^\d+$/
    const REGEX_NUMBER = /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/
    const REGEX_IPv4 = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const REGEX_IPv6 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
    
    const isIPv6 = (value: string): boolean => REGEX_IPv6.test(String(value))
    const isIPv4 = (value: string): boolean => REGEX_IPv4.test(String(value))
    const isEmail = (value: string): boolean => REGEX_MAIL.test(String(value))
    const isPhone = (value: string): boolean => REGEX_PHONE.test(String(value))
    const isNumber = (value: string): boolean => REGEX_NUMBER.test(String(value))
    const isPassword = (value: string): boolean => REGEX_PASSWORD.test(String(value))
    const isOnlyNumber = (value: string): boolean => REGEX_ONLY_NUMBER.test(String(value))
    const isEmpty = form => JSON.stringify(form) === '{}'
    
    const validateForm = useMemo(() => form && form, [form])

    // Validation
    const validation = (e: any) => { 
        const inputName = e.target.name
        const inputValue = e.target.value

        const statusInput = (status: boolean = false, message: string = '', customInputName: string = undefined): void => {
            setValidate(state => ({
                ...state,
                [customInputName || inputName]: {
                    status: status,
                    message: message
                }
            }))
        }

       
        const validateInput = (condition, invalidMessage, inputName: string = undefined) =>
            condition ? statusInput(true, '', inputName) : statusInput(false, invalidMessage, inputName)

        if (inputValue === '') {
            // Empty field
            statusInput(false, empty.field)
        } else {
            // Not Empty
            statusInput(true)

            /*
                Validate Rules
            */
            // Validate Fullname to string
            if (inputName === 'fullname') {
                validateInput((inputValue.length >= 6 && inputValue.length <= 64), fullname.length)
            } 
            // Validate Email
            if (inputName === 'email') {
                validateInput(REGEX_MAIL.test(String(inputValue)), email.format)
            }
            // Validate Phone
            if (inputName === 'phone') {
                validateInput(REGEX_PHONE.test(String(inputValue)), phone.format)
            }

            // Validate Password to length
            if (inputName === 'password' && (validateForm && !validateForm.confirmPassword)) {
                validateInput((inputValue.length >= 6 && inputValue.length <= 64), password.length)
            } 
            // Validate Password to Equal if exist confirmPassword
            if (inputName === 'password' && (validateForm && !!validateForm.confirmPassword)) {
                validateInput((validateForm && validateForm.confirmPassword === inputValue), password.equal, 'confirmPassword')
            }
            // Validate Confirm password to Equal
            if(inputName === 'confirmPassword') {
                validateInput((validateForm && validateForm.password === inputValue), password.equal)
            }

        }
    }

    // Validation Input
    const validationInput = (e: any) => { 
        validation(e)
    }


    return {
        isIPv4,
        isIPv6,
        isEmpty,
        isEmail,
        isPhone,
        setForm,
        isNumber,
        validate,
        isPassword,
        setValidate,
        isOnlyNumber,
        validationInput,
    }
}