import { useState, useEffect } from 'react'
import { localStorageKey } from 'core/localstorage'
import { LanguagesOptions } from 'types/props'
import { UseLanguage } from 'types'
import { useTranslation } from 'react-i18next'


export const useLanguage = (defaultLanguage: string, languages: LanguagesOptions[] = []): UseLanguage => {
    const { i18n } = useTranslation();

    const [options, setOptions] = useState<LanguagesOptions[]>(languages)
    const [value, setValue] = useState<string>(defaultLanguage)
    const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLanguage)


    useEffect(() => {
        const currentLang = localStorage.getItem(localStorageKey.language)
        const existLang = options.filter(option => option.value === currentLang)
        
        currentLang === null && localStorage.setItem(localStorageKey.language, value)
        existLang.length ? setValue(currentLang) : setValue(defaultLanguage)
        setCurrentLanguage(currentLang)

    }, [defaultLanguage, options, value])

    const changeLanguage = (e) => {
        const optionValue = e.target.textContent
        localStorage.setItem(localStorageKey.language, optionValue)
        setValue(optionValue)
        setCurrentLanguage(optionValue)
        i18n.changeLanguage(optionValue)
        // document.location.reload()
    }

    return {
        value,
        changeLanguage,
        currentLanguage, 
        setCurrentLanguage,
        languages: options,
        setLanguages: setOptions,
    }
}