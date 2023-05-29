import { FC, HTMLInputTypeAttribute, useEffect, useState } from 'react'
import classNames from 'classnames'

import './index.sass'

interface SelectOptions {
    value: string
    type: HTMLInputTypeAttribute,
    disabled: boolean
    checked: boolean
}


const Select: FC = () => {
    const optionsMock = [
        { value: 'EN', type: 'radio', disabled: false, checked: false, },
        { value: 'RU', type: 'radio', disabled: false, checked: false, },
        { value: 'KO', type: 'radio', disabled: false, checked: false, },
        { value: 'AR', type: 'radio', disabled: false, checked: false, },
        { value: 'ZH', type: 'radio', disabled: true, checked: false, },
    ]

    const [isOpen, setIsOpen] = useState < boolean > (true)
    const [hideList, setHideList] = useState < boolean > (true)
    const [value, setValue] = useState < string > ('EN')
    const [options, setOptions] = useState < SelectOptions[] > ([...optionsMock])

    const inputStyles = (key) => classNames(
        'select-input',
        key.checked && 'select-input-checked'
    )


    useEffect(() => {
        // Hide Content list
        !isOpen && setTimeout(() => {
            setHideList(false)
            console.log()
        }, 100)

        // Set default checkbox
        options && options.filter(option => option.checked = option.value === value)

        //  If use LocalStorage
        const localStorageItem = localStorage.getItem('dl_lng')

        if (localStorageItem === null) {
            localStorage.setItem('dl_lng', value)
        }

        if (localStorageItem !== value && localStorageItem !== null) {
            localStorage.setItem('dl_lng', localStorageItem)
            setValue(localStorageItem)
        }


    }, [value, isOpen, options])
    const openList = (e) => {
        const currentValue = e.target.getAttribute('data-current-value')
        setIsOpen(!isOpen)
        setValue(currentValue)
        setHideList(true)

    }
    const selectOption = (e) => {
        const value = e.target.getAttribute('data-value')
        localStorage.setItem('dl_lng', value) // If use LocalStorage
        setValue(value)
        setIsOpen(false)
    }
    return (
        <div className='login'>
            <div className='block'>
                <div className='select' data-state={isOpen ? 'open' : 'close'}>
                    <div className='select-title select-arrow' onClick={(e) => openList(e)} data-current-value={value}>{value}</div>
                    {
                        hideList && (
                            <div className='select-content'>
                                {
                                    options && options.map((option, idx) => {
                                        return (
                                            <div key={idx}>
                                                <input id={option.value} className={inputStyles(option)} type={option.type} disabled={option.disabled} name={option.value} />
                                                <label htmlFor={option.value} tabIndex={idx} className='select-label' data-value={option.value} onClick={e => selectOption(e)}></label>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

Select.defaultProps = {}

export default Select