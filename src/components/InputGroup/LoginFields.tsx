import { FC, useEffect} from 'react'
import { Input } from 'components/ui'
import { useForm, useValidation } from 'hooks'
import { FieldsProps } from 'types/props'
import { PhoneSVG, EmailSVG, PasswordSVG } from 'assets/icons'

const LoginFields: FC<FieldsProps> = ({ placeholders, setForm }) => {
    const { isPhone } = useValidation()
    const { onChange, onBlur, form } = useForm({
        login: '',
        password: '',
    })

    useEffect(() => {
        setForm(form)
    }, [form, setForm])

    return (
        <>
            <Input
                id='login'
                type='text'
                image={isPhone(form.login) ? <PhoneSVG className='input-icon' /> : <EmailSVG className='input-icon' />}
                placeholder={placeholders.login}
                value={form.login ? form.login : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='password'
                type='password'
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.password}
                value={form.password ? form.password : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
        </>
    )
}

export default LoginFields