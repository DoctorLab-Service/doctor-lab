import './index.sass'

const TitleForm = ({ title }) => {
    return (
        <header className='form-body-header'>
            <h1 className='form-body-title'>{ title }</h1>
        </header>
    )
}

export default TitleForm