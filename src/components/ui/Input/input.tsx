import { SuccessSVG, ErrorSVG } from 'assets/icons'
import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

import { InputProps } from 'types/props'

const Input: FC<InputProps> = ({ id, image, status, className, autoComplete, type, name, placeholder, statusimage, ...args }) => {
    let StatusSVG: ReactNode
    const inputClasses = classNames('input', className)
    let fieldClasses = classNames(
        'input-field',
        !image && 'input-field-no-icon',
    )

    switch(status) {
        case 'success':
            StatusSVG = <SuccessSVG className='input-icon-status' />
            fieldClasses = fieldClasses + ' input-field-success'
            break
        case 'error':
            StatusSVG = < ErrorSVG className='input-icon-status' />
            fieldClasses = fieldClasses + ' input-field-error'
            break
        default: 
            StatusSVG = undefined
            break
    }


    
    return (
        <div className={inputClasses}>
            <div className='input-wrapper'>
                { image && image }
                <input 
                    id={id}
                    className={fieldClasses}
                    autoComplete={autoComplete}
                    type={type}
                    name={name ? name : id}
                    placeholder={placeholder}
                    {...args}
                />
                {status && StatusSVG }
            </div>
        </div>
    )
}

Input.defaultProps = {
    autoComplete: 'on',
    className: '',
    name: '',
    type: 'text',
    placeholder: 'Input text',
    image: undefined,
    status: undefined,
    statusimage: undefined,
}
export default Input