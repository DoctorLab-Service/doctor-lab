
import { useDarkMode, usePaths } from 'hooks'
import { Link, Route, Routes } from 'react-router-dom'
import { PageLayout, PrivacyPolicy, TermOfUse  } from 'pages'

import 'utils/languages/i18next'
import 'styles/index.sass'

const App = (props) => {
    const { paths } = usePaths()
    const { darkMode, toggleTheme } = useDarkMode()

    return (
        <div className='app'>
            <Routes>
                {/* LOGIN LINKS */}
                <Route path={paths.main} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} >
                    <Route path={paths.auth} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
                    <Route path={paths.login} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
                </Route>

                {/* REGISTER LINKS */}
                <Route path={paths.register.register} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} >
                    <Route path={paths.register.patient} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
                    <Route path={paths.register.doctor.doctor} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
                    <Route path={paths.register.doctor.dentist} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
                </Route>
                
                {/* FORGOT LINKS */}
                <Route path={paths.forgot.password} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />

                {/* CHANGE PASSWORD LINKS */}
                <Route path={paths.cahnge.password} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />

                {/* SUPPORT LINKS */}
                <Route path={paths.support} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />

                {/* VERIFICATION LINKS */}
                <Route path={paths.verification.phone} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
                {/* <Route path={paths.verification.password} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} /> */}



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
    )
}

export default App