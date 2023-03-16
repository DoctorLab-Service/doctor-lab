import { FC } from 'react'
import { SVGProps } from '../types'

const DarkSVG: FC<SVGProps> = ({ className }) => {
    return (
        <span className={className}>
            <svg id='DarkSVG' className={`${className}-dark`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M12 3a9 9 0 108.9 7.64 5.39 5.39 0 01-9.2-5.61 5.4 5.4 0 011.66-1.93c-.44-.06-.9-.1-1.36-.1z' />
            </svg> 
        </span>
    )
}

DarkSVG.defaultProps = {
    className: 'icon'
}

export default DarkSVG


