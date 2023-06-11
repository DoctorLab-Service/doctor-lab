import { FC, useEffect } from 'react'
import { Input } from 'components/ui'
import { PhoneSVG } from 'assets/icons'
import { FieldsProps } from 'types/props'
import { useForm } from 'hooks'

const VerifiactionFields: FC<FieldsProps> = ({ placeholders, setForm }) => {
    const { onChange, onBlur, form } = useForm({
        code: '',
    })

    useEffect(() => {
        setForm(form)
    }, [form, setForm])
    
    return (
        <>
            <Input
                id='code'
                type='text'
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