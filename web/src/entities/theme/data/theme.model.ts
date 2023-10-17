export enum Themes {
	LIGHT = 'light',
	DARK = 'dark'
}

export interface ThemeContextProps {
	theme?: Themes
	setTheme?: () => void
}
