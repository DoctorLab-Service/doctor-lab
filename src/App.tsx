
import { useAuth, useDarkMode, useDevice, usePaths } from 'hooks'
import { Link, Route, Routes } from 'react-router-dom'
import { PageLayout, PrivacyPolicy, TermOfUse  } from 'pages'

import 'utils/languages/i18next'
import 'styles/index.sass'
import { useState } from 'react'

const App = (props) => {
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false) 
    // const { isAuth, redirectToApp } = useAuth()
    
    const { paths, state } = usePaths()
    const { darkMode, toggleTheme } = useDarkMode()
    const { device, orientation } = useDevice()
    
    return (
        <div className='app' data-device={device} data-orient={orientation} >
            {/* {
                !isAuth ? ( */}

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
                        {
                            isChangePassword && <Route
                                path={paths.cahnge.password}
                                element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />}
                            />
                        }
        
                        {/* SUPPORT LINKS */}
                        <Route path={paths.support} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
        
                        {/* VERIFICATION LINKS */}
                        {
                            // Verification phone when create account
                            (state && state.phone) && <Route
                                path={paths.verification.phone}
                                element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />}
                            />
                        }
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
                {/* )
                    // : redirectToApp()

            } */}
            <span style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'rgba(0,0,0, .5)', zIndex: '2', fontSize: '10px' }}>app_v1.0.02</span>
    
        </div>
    )
}

export default App