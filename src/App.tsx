
import { useEffect, useMemo } from 'react'
import { useDarkMode, useDevice, usePaths } from 'hooks'
import { Route, Routes } from 'react-router-dom'
import { Page404, PageLayout, PrivacyPolicy, TermOfUse  } from 'pages'
import { useAppSelector, RootState, checkRecoveryPassword, useAppDispatch, checkIsChangePasswordForm } from 'store'
import { VersionApp } from 'components'
import packageJson from '../package.json'

import 'utils/languages/i18next'
import 'styles/index.sass'
import 'utils/reset-transition'


const App = (props) => {
    const { name, version } = packageJson
    const { device, orientation } = useDevice()
    
    const { paths, page: { isRecoveryPassword, isChangePassword } } = usePaths()
    const { darkMode, toggleTheme } = useDarkMode()
    // const { isAuth, redirectToApp } = useAuth()

    const dispatch = useAppDispatch()

    const { forms: { register: registerState }, isChangePasswordForm, confirmEmail } = useAppSelector((({ form }: RootState) => form))
 
    useMemo(() => {
        isChangePassword && dispatch(checkIsChangePasswordForm())
    }, [dispatch, isChangePassword])
    
    useMemo(() => {
        isRecoveryPassword && dispatch(checkRecoveryPassword())
    }, [dispatch, isRecoveryPassword])
    
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
                            (isChangePassword && isChangePasswordForm) && <Route
                                path={paths.cahnge.password} 
                                element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} /> }
                            />
                        }
        
                        {/* SUPPORT LINKS */}
                        <Route path={paths.support} element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />} />
        
                        {/* VERIFICATION LINKS */}
                        {
                            // Verification phone when create account
                            registerState.phone && <Route
                                path={paths.verification.phone}
                                element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />}
                            />
                        }

                        {/* RECOVER PASSWORD LINK */}
                        {
                            (isRecoveryPassword && confirmEmail.confirm && !isChangePasswordForm) &&
                                <Route 
                                    path={paths.verification.password}
                                    element={<PageLayout darkMode={darkMode} toggleTheme={toggleTheme} />}
                                />
                        }
        
                        {/* PRIVACY & TERM  LINKS */}
                        <Route path={paths.privacyPolicy} element={<PrivacyPolicy />} />
                        <Route path={paths.termOfUse} element={<TermOfUse />} />
        
        
                        <Route path='*' element={<Page404 />} />
        
                    </Routes>
                {/* )
                    // : redirectToApp()

            } */}

            {/* Ваш код компонента для восстановления пароля */}


            <VersionApp version={`${name}_v${version}`} />
    
        </div>
    )
}

export default App