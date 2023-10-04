import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { NotificationsProps } from 'types/props'


import './styles.sass'
import 'react-toastify/dist/ReactToastify.css'



const Notifications: FC<NotificationsProps> = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
        />
    )
}

export default Notifications