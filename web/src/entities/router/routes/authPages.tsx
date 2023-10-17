import {RouteObject} from "react-router-dom";
import {Pages} from "@/entities/router";
import {lazy} from "react";


const Login = lazy(() => import("@pages/authPages/login/Login")
	.then(({Login}) => ({default: Login})))
const Register = lazy(() => import("@pages/authPages/register/Register")
	.then(({Register}) => ({default: Register})))

export const AuthPages: RouteObject[] = [
	{
		path: Pages.LOGIN,
		element: <Login/>,
	},
	{
		path: Pages.REGISTER,
		element: <Register/>,
	},
]