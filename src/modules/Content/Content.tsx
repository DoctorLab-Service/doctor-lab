import { FC } from 'react'
import { ContentProps } from 'types/props'

const Content: FC<ContentProps> = ({ children }) => {

    return (
        <div className='content-block'>
            <div className='content-background'></div>
                { children }
        </div>
    )
}

export default Content