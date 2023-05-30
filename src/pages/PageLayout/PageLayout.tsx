import { FC } from 'react'
import { Background, Content, Form } from 'modules'
import { PageLayoutProps } from 'types/props'
import { Header, Footer } from 'components'
import { usePaths } from 'hooks'
import classNames from 'classnames'

const PageLayout: FC<PageLayoutProps> = ({ toggleTheme, darkMode }) => {
    const { pagename } = usePaths()
    const isNotSupport = pagename !== 'support'
    const classes = classNames(
        'page',
        pagename === 'changePassword' ? 'change-password' : pagename
    )
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
