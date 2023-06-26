import classNames from 'classnames'
import { FC } from 'react'
import { LoaderProps } from 'types/props'


const Loader: FC<LoaderProps> = ({ className }) => {
    const classes = classNames(
        'loader',
        className,
    )
    return (
        <div className={classes}>
            <i className='loader loader-icon'></i>
        </div>
    )
}

Loader.defaultProps = {
    className: ''
}

export default Loader