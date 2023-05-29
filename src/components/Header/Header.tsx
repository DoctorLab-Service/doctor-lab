import { ToggleTheme, ToggleLanguage } from 'components'
import classNames from 'classnames'
import { FC } from 'react'
import { ActionsProps } from 'types/props'

const Header: FC<ActionsProps> = ({ toggleTheme, darkMode, className }) => {
    const languages = [
        { value: 'EN', checked: true, },
        { value: 'RU', checked: false, },
    ]
    const classes = classNames('actions', className)
    return (
        <header className={classes}>
            <ToggleTheme toggleTheme={toggleTheme} darkMode={darkMode} />
            <ToggleLanguage langauges={languages} />
        </header>
    )
}

Header.defaultProps = {
    darkMode: false,
    className: ''
}

export default Header