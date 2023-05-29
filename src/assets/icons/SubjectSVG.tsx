import { FC } from 'react'
import { SVGProps } from '../types'

const SubjectSVG: FC<SVGProps> = ({ className }) => {
    return (
        <span className={className}>
            <svg id='SubjectSVG' className={`${className}-svg`} width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13,16H3a1,1,0,0,0,0,2H13a1,1,0,0,0,0-2ZM3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,3H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
            </svg>
        </span>
    )
}

SubjectSVG.defaultProps = {
    className: 'icon'
}

export default SubjectSVG


