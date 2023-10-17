import {RouterProvider} from "react-router-dom";

import {router} from "@/entities/router/api/router.tsx";

import '@/assets/styles/main.scss'


function App() {
	return (
		<RouterProvider router={router}/>
	)
}

export default App
