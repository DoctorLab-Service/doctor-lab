import { FC } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HelpSVG } from 'assets/icons'
import { SupportLinkProps } from 'types/props'
import { useDarkMode } from 'hooks'


const Support: FC<SupportLinkProps> = ({ path, text, className }) => {
    const { resetTransition } = useDarkMode()

    const classes = classNames(
        'help',
        className,
    )
    const clickLink = () => {
        resetTransition()
    }
    return (
        <Link to={path} className={classes} onClick={clickLink}>
            <span className="help-text">{text}</span>
            <HelpSVG className='help-icon'/>
        </Link>
    )
}

Support.defaultProps = {
    path: '',
    text: 'Help',   
    className: '',

}
export default Support
