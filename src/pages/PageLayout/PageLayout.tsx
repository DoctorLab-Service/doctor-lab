import { FC } from 'react'
import { Background, Content, Form } from 'modules'
import { PageLayoutProps } from 'types/props'
import { Header, Footer } from 'components'
import { usePathname } from 'hooks'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

const PageLayout: FC<PageLayoutProps> = ({ toggleTheme, darkMode }) => {
    const { pagename } = usePathname()
    const isNotSupport = pagename !== 'support'
    const classes = classNames(
        'page',
        pagename === 'changePassword' ? 'change-password' : pagename
    )
    // console.log(document.location)
    return (
        <div className={classes}>

            <Background type='login' darkMode={darkMode} />

            <Content>
                <Header toggleTheme={toggleTheme} darkMode={darkMode} />
                
                <Form darkMode={darkMode} />
                
                { isNotSupport && <Footer /> }
            </Content>
            
        </div>
    )
}

export default PageLayout
