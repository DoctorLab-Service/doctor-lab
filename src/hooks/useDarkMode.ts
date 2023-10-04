import { useState, useMemo, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'


export const useDarkMode = () => {
    const [isDark, setIsDark] = useState<boolean>(false)
    const [transition, setTransition] = useState<boolean>(false)

    // Set system theme color
    useMediaQuery(
        { query: '(prefers-color-scheme: dark)' },
        undefined,
        (systemPrefersScheme: boolean) => setIsDark(systemPrefersScheme)
    )

    const resetTransition = (reset = false): void => {
        const head = document.getElementsByTagName('head')[0]
        const dataResetTransition = head.querySelectorAll('[data-reset-transition="reset"]')

        if (!reset && dataResetTransition.length) {
            head.removeChild(dataResetTransition[0])
            return
        }

        if (!dataResetTransition.length) {
            const style = document.createElement('style')
            style.setAttribute('data-reset-transition', 'reset')
    
            const clearTransitionRow = '* {\n'
                + '  -webkit-transition: none !important;\n'
                + '  -moz-transition: none !important;\n'
                + '  -ms-transition: none !important; \n'
                + '  -ms-transition: none !important;\n'
                + '  -o-transition: none !important;\n'
                + '}\n'
    
            style.textContent = clearTransitionRow + style.textContent
            head.appendChild(style)
            return
        }
    }


    // Set is dark if it set in local storage
    const darkMode = useMemo(() => {
        const localStorageTheme = localStorage.getItem('dl-theme')
        const body = document.body

        if (localStorageTheme) {
            body.setAttribute('data-theme', 'dark')
            setIsDark(true)
        }
    }, [])

    useEffect(() => {
        const body = document.body
        // Set dark mode if isDark true
        if (isDark) {
            body.setAttribute('data-theme', 'dark')
            localStorage.setItem('dl-theme', 'dark')
        } else {
            // Remove dark mode if isDark false
            body.setAttribute('data-theme', 'light')
            localStorage.removeItem('dl-theme')
        }
        
        if(transition) {
            setTimeout(() => {
                setTransition(false)
                resetTransition()
            }, 100);
        }
    }, [darkMode, isDark, transition])

    const toggleTheme = (): void => {
        setTransition(true)
        resetTransition(true)
        setIsDark(!isDark)
    }
    
    const offTransition = (timeout: number = 100) => {
        resetTransition(true)
        setTimeout(() => {
            resetTransition()
        }, timeout)
    }
    
    return {
        darkMode: isDark, 
        transition,
        toggleTheme,
        resetTransition: offTransition,
    }
}