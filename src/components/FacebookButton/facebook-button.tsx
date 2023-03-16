import { FacebookSVG } from 'assets/icons'
import { Button } from 'components/ui'
import { FC } from 'react'

interface Props {
    circle?: boolean
}

const FacebookButton: FC<Props> = ({circle}) => {
    // const { facebookResponse, facebookLogin, facebookLogout } = useFacebook()
    // console.log(facebookResponse)    

    const responseFacebook = (response) => {
        console.log(response);
    }

    return (
        <Button onClick={responseFacebook} circle={circle}>
            <FacebookSVG className='btn-icon' />
        </Button>
    )
}

FacebookButton.defaultProps = {
    circle: false,
}
 
export default FacebookButton
