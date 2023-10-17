import {createBrowserRouter} from "react-router-dom";

import {Pages} from "@/entities/router";
import {Layout} from "@/app/layout/Layout.tsx";
import {AuthPages} from "@/entities/router";


export const router = createBrowserRouter([
	{
		path: Pages.HOME,
		element: <Layout/>,
		children: [
			...AuthPages,
		],
	}
])