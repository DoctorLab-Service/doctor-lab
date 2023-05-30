import { ToggleTheme, ToggleLanguage } from 'components'
import classNames from 'classnames'
import { FC } from 'react'
import { ActionsProps } from 'types/props'

const Header: FC<ActionsProps> = ({ toggleTheme, darkMode, className }) => {
    const classes = classNames('actions', className)
    return (
        <header className={classes}>
            <ToggleTheme toggleTheme={toggleTheme} darkMode={darkMode} />
            <ToggleLanguage />
        </header>
    )
}

Header.defaultProps = {
    darkMode: false,
    className: ''
}

export default Header