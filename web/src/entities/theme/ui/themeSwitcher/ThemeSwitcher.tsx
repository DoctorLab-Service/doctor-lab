import { CSSProperties, FC, useMemo } from 'react'

import { Themes, useTheme } from '@/entities/theme'

import styles from './Theme.module.scss'

interface ThemeSwitcherProps {
	custom?: CSSProperties
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ custom }) => {
	const {
		theme,
		setTheme,
	} = useTheme()

	const inputValue = useMemo(() => theme === Themes.DARK, [theme])

	return (
		<div className={styles.checkboxWrapper} style={custom}>
			<label className={styles.switch}>
				<input type="checkbox" checked={inputValue} onChange={setTheme}/>
				<span className={styles.slider}/>
			</label>
		</div>
	)
}
