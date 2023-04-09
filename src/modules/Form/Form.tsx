import { InputGroup, TitleForm } from 'components'
import { Button } from 'components/ui'

import './index.sass'
import { paths } from 'core/routes'
import { FC } from 'react'

interface Props {
    currentRole: string
}

const Form: FC<Props> = ({ currentRole }) => {
    const pathWithRole = currentRole === 'doctor' || currentRole === 'dentist' ? paths.register.doctor[currentRole] : currentRole !== 'admin' ? paths.register[currentRole] : paths.login
    const roleName = currentRole[0].toLocaleUpperCase() + currentRole.slice(1)
    return (
        <form className='form-body'>
            <TitleForm title={`Sign In as ${roleName}`} />

            <InputGroup />

            <footer className='form-body-footer'>
                <div className='link-group'>
                    <Button
                        link={pathWithRole}
                        size='medium'
                        text='Have not account'
                    />
                    <Button
                        link={paths.forgot.password}
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
