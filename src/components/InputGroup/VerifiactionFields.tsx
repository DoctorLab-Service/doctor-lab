import { FC } from 'react'
import { Input } from 'components/ui'
import { PhoneSVG } from 'assets/icons'
import { FieldsProps } from 'types/props'
import { useForm } from 'hooks'

const VerifiactionFields: FC<FieldsProps> = ({ placeholders }) => {
    const { onChange, onBlur, form, validate } = useForm()

    return (
        <>
            <Input
                id='code'
                type='text'
                validate={validate}
                image={<PhoneSVG className='input-icon' />}
                placeholder={placeholders.code}
                value={form.code ? form.code : ''}
                onBlur={onBlur}
                onChange={onChange}
            />
        </>
    )
}

export default VerifiactionFields