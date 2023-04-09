import { useState, useEffect, FC } from 'react'

import './index.sass'
import { localStorageKey } from 'core/localstorage'

interface Props  {
    langauges? : LanguagesOptions[]
    defaultValue?: string
}

interface LanguagesOptions {
    value: string
    checked: boolean
}

const ToggleLanguage: FC<Props> = ({ langauges, defaultValue }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [options, setOptions] = useState<LanguagesOptions[]>(langauges)
    const [value, setValue] = useState<string>(defaultValue)


    useEffect(() => {
        const currentLang = localStorage.getItem(localStorageKey.language)
        const existLang = options.filter(option => option.value === currentLang)
        
        currentLang === null && localStorage.setItem(localStorageKey.language, value)
        existLang.length ? setValue(currentLang) : setValue(defaultValue)

    }, [defaultValue, options, value])

    const openList = (e) => {
        setIsOpen(!isOpen)
    }
    const checkOption = (e) => {
        const optionValue = e.target.textContent
        localStorage.setItem(localStorageKey.language, optionValue)
        setValue(optionValue)
        setIsOpen(false)
    }
    return (
        <div 
            className='language-toggle' 
            data-state={isOpen && options.length > 1 ? 'open' : 'close'}  
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className='language-toggle-selected' onClick={(e) => openList(e)}>{value}</div>
            <ul className='language-toggle-list'>
                {
                    options && options.map((option, idx) => {
                        return option.value !== value && (
                            <li
                                key={idx}
                                id={option.value}
                                className='language-toggle-item'
                                onClick={e => checkOption(e)}
                            ><span>{option.value}</span></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
ToggleLanguage.defaultProps = {
    langauges: [{ value: 'EN', checked: true, }],
    defaultValue: 'EN'    

}

export default ToggleLanguage
