import { SuccessSVG, ErrorSVG } from 'assets/icons'
import React, { FC, HTMLInputTypeAttribute, ReactNode } from 'react'
import classNames from 'classnames'

import './styles/index.sass'

interface StatusImage {
    success: ReactNode
    error: ReactNode
}

interface Props {
    autoComplete?: 'on' | 'off'
    className?: string
    id: string
    name?: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    image?: ReactNode
    status?: 'success' | 'error' | undefined
    statusImage?: StatusImage
}

const Input: FC<Props> = ({ id, image, status, className, autoComplete, type, name, placeholder }) => {
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
            fieldClasses= fieldClasses + ' input-field-error'
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
    statusImage: undefined,
}
export default Input