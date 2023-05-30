import { Support } from 'components'
import { usePaths } from 'hooks'

const Footer = () => {
    const { paths } = usePaths()
    
    return (
        <footer className="footer">
            <Support path={paths.support}/>
        </footer>
    )
}

export default Footer
