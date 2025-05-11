"use client";
import SideBar from "@//app/components/portal/sideBar";
import { useState, useEffect, ReactElement } from "react";
import styles from "./layout.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isTokenExpired = (token: any) => {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		const expiry = payload.exp * 1000; // milissegundos
		return Date.now() > expiry;
	} catch (e) {
		return true;
	}
};

export default function PortalPageLayout({
	children,
	login,
}: {
	children: ReactElement;
	login: ReactElement;
}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			if (isTokenExpired(token)) {
				localStorage.removeItem("token");
				window.location.reload();
			} else {
				setIsAuthenticated(true);
				toast.success("Bem Vindo!");
			}
		}
	}, []);

	return isAuthenticated ? (
		<div className={styles.main}>
			<SideBar />
			<ToastContainer />
			{children}
		</div>
	) : (
		<div>{login}</div>
	);
}
