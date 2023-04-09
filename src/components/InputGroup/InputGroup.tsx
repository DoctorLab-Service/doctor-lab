import { EmailSVG, PasswordSVG } from "assets/icons"
import { Input } from "components/ui"
import { useState } from "react"

const InputGroup = () => {
    const [statusField, setStatusField] = useState<'success' | 'error' | undefined>(undefined)
    
    return (
        <div className='input-group'>
            <Input
                id='email'
                status={statusField}
                image={<EmailSVG className='input-icon' />} // <PhoneSVG className='input-icon'/>
                placeholder='Email or Phone'
            />
            <Input
                id='password'
                type='password'
                status={statusField}
                autoComplete='off'
                image={<PasswordSVG className='input-icon' />}
                placeholder='Password' />
        </div>
    )
}

export default InputGroup
