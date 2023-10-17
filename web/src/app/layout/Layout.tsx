import {Outlet} from "react-router-dom";

import {useTheme} from "@/entities/theme";

import styles from './Layout.module.scss'


export const Layout = () => {
	const {theme} = useTheme()
	return (
		<div className={`${theme} ${styles.app} app`}>
			<main className={styles.main}>
				<Outlet/>
				test
			</main>
		</div>
	);
};