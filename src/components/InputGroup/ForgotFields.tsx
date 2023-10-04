import { useForm } from 'hooks'
import { FC } from 'react'
import { Input } from 'components/ui'
import { EmailSVG } from 'assets/icons'
import { FieldsProps } from 'types/props'

const ForgotFields: FC<FieldsProps> = ({ placeholders }) => {
    const { onChange, onBlur, form, validate } = useForm()

    return (
        <>
            <Input
                id='email'
                type='email'
                validate={validate}
                image={<EmailSVG className='input-icon' />}
                placeholder={placeholders.email}
                value={form.email ? form.email : ''}
                onBlur={onBlur}
                onChange={onChange}
            />
        </>
    )
}

export default ForgotFields