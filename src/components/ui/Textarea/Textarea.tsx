import { SuccessSVG, ErrorSVG } from 'assets/icons'
import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { TextareaProps } from 'types/props'

const Textarea: FC<TextareaProps> = ({ children, id, image, status, className, autoComplete,  name, placeholder, value, ...args }) => {
    let StatusSVG: ReactNode
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


    
    return (
        <div className={textareaClasses}>
            <div className='textarea-wrapper'>
                <textarea 
                    id={id}
                    className={fieldClasses}
                    autoComplete={autoComplete}
                    name={name ? name : id}
                    placeholder={placeholder}
                    {...args}
                >
                    { value || children }
                </textarea>
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
    status: undefined,
    statusimage: undefined,
}
export default Textarea