import { SuccessSVG, ErrorSVG } from 'assets/icons'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import { TextareaProps } from 'types/props'
import { InputStatus } from 'types/core'
import { useValidation } from 'hooks'

const Textarea: FC<TextareaProps> = ({ children, id, image, validate, className, autoComplete,  name, placeholder, value, ...args }) => {
    let StatusSVG: ReactNode
    const [status, setStatus] = useState<InputStatus>(undefined) 
    const textareaClasses = classNames('textarea', className)
    let fieldClasses = classNames(
        'textarea-field',
        !image && 'textarea-field-no-icon',
    )


    switch(status) {
        case 'success':
            StatusSVG = <SuccessSVG className='textarea-icon-status' />
            fieldClasses = fieldClasses + ' textarea-field-success'
            break
        case 'error':
            StatusSVG = < ErrorSVG className='textarea-icon-status' />
            fieldClasses= fieldClasses + ' textarea-field-error'
            break
        default: 
            StatusSVG = undefined
            break
    }

    useEffect(() => {
        setStatus(validate && validate[id] ? validate.status ? 'success' : 'error' : undefined)
        
    }, [id, status, validate])

    
    return (
        <div className={textareaClasses}>
            <div className='textarea-wrapper'>
                <textarea 
                    id={id}
                    className={fieldClasses}
                    autoComplete={autoComplete}
                    name={name ? name : id}
                    placeholder={placeholder}
                    defaultValue={value || children}   
                    {...args}
                ></textarea>
                {status && StatusSVG }
            </div>
        </div>
    )
}

Textarea.defaultProps = {
    autoComplete: 'on',
    className: '',
    name: '',
    value: '',
    children: '',
    placeholder: 'Input text',
    image: undefined,
    validate: undefined,
    statusimage: undefined,
}
export default Textarea