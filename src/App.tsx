
import { useDarkMode } from 'hooks'
import { Link, Route, Routes } from 'react-router-dom'
import { paths } from 'core/routes'
import { Dentist, Doctor, Forgot, Login, Patient, PrivacyPolicy, TermOfUse } from 'pages'

const App = (props) => {
    const { darkMode, toggleTheme } = useDarkMode()
    
    return (
        <>
            <div className='app'>
                <Routes>
                    {/* LOGIN LINKS */}
                    <Route path={paths.main} element={<Login darkMode={ darkMode } toggleTheme={ toggleTheme }/>}>
                        <Route path={paths.auth} element={<Login darkMode={darkMode} toggleTheme={toggleTheme} />} />
                        <Route path={paths.login} element={<Login darkMode={darkMode} toggleTheme={toggleTheme} />} />
                    </Route>

                    {/* REGISTER LINKS */}
                    <Route path={paths.register.patient} element={<Patient />} />
                    <Route path={paths.register.doctor.doctor} element={<Doctor />} />
                    <Route path={paths.register.doctor.dentist} element={<Dentist />} />
                    
                    {/* FORGOT LINKS */}
                    <Route path={paths.forgot.password} element={<Forgot />} />


                    {/* PRIVACY & TERM  LINKS */}
                    <Route path={paths.privacyPolicy} element={<PrivacyPolicy />} />
                    <Route path={paths.termOfUse} element={<TermOfUse />} />


                    <Route path='*' element={
                        <>
                            <h1>Page not found 404!</h1>
                            <Link to={paths.main}>Go to main</Link>
                        </>
                    } />
                    
                </Routes>
            </div>
        </>
    )
}

export default App