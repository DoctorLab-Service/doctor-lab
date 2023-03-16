import { FacebookSVG } from 'assets/icons'
import { Button } from 'components/ui'
import { FacebookLogin as Facebook } from 'react-facebook-login/dist/facebook-login-render-props'
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
        <Facebook
            appId="130033080004073"
            autoLoad={false}
            callback={responseFacebook}
            render={renderProps => (
                <Button onClick={renderProps.onClick} circle={circle}>
                    <FacebookSVG className='btn-icon' />
                </Button>
            )}
        />
    )
}

FacebookButton.defaultProps = {
    circle: false,
}
 
export default FacebookButton
