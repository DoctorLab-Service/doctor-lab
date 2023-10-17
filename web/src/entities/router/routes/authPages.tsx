import {RouteObject} from "react-router-dom";
import {Pages} from "@/entities/router";
import {Login} from "@pages/authPages/Login/Login.tsx";

export const AuthPages: RouteObject[] = [
	{
		path: Pages.LOGIN,
		element: <Login/>,
	}
]