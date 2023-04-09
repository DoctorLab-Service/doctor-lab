import { SocialLoginButton } from 'components'
import { FC } from 'react'
import { SocialProviders } from 'types'

import './index.sass'

interface Props {
    providers: SocialProviders[]
}

const Social: FC<Props> = ({ providers }) => {
    return (
        <ul className='social'>
            {
                providers && providers.map((provider, idx) => (
                    <li key={idx} className='item circle'>
                        <SocialLoginButton circle provider={provider} />
                    </li>

                ))   
            }
        </ul>
  )
}

Social.defaultProps = {
    providers: []
}

export default Social
