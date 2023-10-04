import { FC } from 'react'
import { Input } from 'components/ui'
import { FieldsProps } from 'types/props'
import { PasswordSVG } from 'assets/icons'
import { useForm } from 'hooks'

const ChangePasswordFields: FC<FieldsProps> = ({ placeholders }) => {
    const { onChange, onBlur, form, validate } = useForm()

    return (
        <>
            <Input
                id='password'
                type='password'
                validate={validate}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.newPassword}
                value={form.password ? form.password : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='rePassword'
                type='password'
                validate={validate}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.rePassword}
                value={form.rePassword ? form.rePassword : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
        </>
    )
}

export default ChangePasswordFields