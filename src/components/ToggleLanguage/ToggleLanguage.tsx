import { useState, FC } from 'react'

import { ToggleLanguageProps } from 'types/props'
import { useLanguage } from 'hooks'


const ToggleLanguage: FC<ToggleLanguageProps> = () => {
    const languagesMock = [
        { value: 'EN', checked: true, },
        { value: 'RU', checked: false, },
    ]
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { languages, value, changeLanguage } = useLanguage('EN', languagesMock)
    
    return (
        <div 
            className='language-toggle' 
            data-state={isOpen && languages.length > 1 ? 'open' : 'close'}  
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className='language-toggle-selected' onClick={() => setIsOpen(!isOpen)}>{value}</div>
            <ul className='language-toggle-list'>
                {
                    languages && languages.map((option, idx) => {
                        return option.value !== value && (
                            <li
                                key={idx}
                                id={option.value}
                                className='language-toggle-item'
                                onClick={e => changeLanguage(e)}
                            ><span>{option.value}</span></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
ToggleLanguage.defaultProps = {
    languages: [{ value: 'EN', checked: true, }],
    defaultValue: 'EN'    

}

export default ToggleLanguage
