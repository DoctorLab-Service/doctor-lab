import {
	FC, PropsWithChildren, useMemo, useState,
} from 'react'

import { LocalStorageKeys } from '@/shared/data'
import { ThemeContext, ThemeContextProps, Themes } from '@/entities/theme'

const defaultTheme = localStorage.getItem(LocalStorageKeys.theme) as Themes || Themes.DARK

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<Themes>(defaultTheme)

	const toggleTheme = () => {
		const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK
		setTheme(newTheme)
		localStorage.setItem(LocalStorageKeys.theme, newTheme)
	}

	const defaultProps = useMemo<ThemeContextProps>(() => ({
		theme,
		setTheme: toggleTheme,
	}), [theme])

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	)
}
