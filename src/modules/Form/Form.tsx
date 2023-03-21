import { EmailSVG, PasswordSVG } from 'assets/icons'
import { TitleForm } from 'components'
import { Input, Button } from 'components/ui'
import { useState } from 'react'

import './index.sass'

const Form = () => {
    const [statusField, setStatusField] = useState<'success' | 'error' | undefined>(undefined)


    return (
        <form className='form-body'>
            <TitleForm title='Sign In' />

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

            <footer className='form-body-footer'>
                <div className='link-group'>
                    <Button
                        link='/register'
                        size='medium'
                        text='Have not account'
                    />
                    <Button
                        link='/forgot'
                        size='medium'
                        text='Forgot password?'
                    />
                </div>

                <Button
                    text='Sign In'
                    variant='primary'
                    onClick={() => console.log('Sign In Button')}
                    fullSize
                />

            </footer>
        </form>
  )
}

export default Form
