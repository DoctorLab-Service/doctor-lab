import { FC } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HelpSVG } from 'assets/icons'
import { SupportLinkProps } from 'types/props'


const Support: FC<SupportLinkProps> = ({ path, text, className }) => {
    const classes = classNames(
        'help',
        className,
    )
    return (
        <Link to={path} className={classes}>
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
