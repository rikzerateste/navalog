"use client";

import SideBar from "@/components/portal/sideBar";
import { useState, useEffect, ReactElement } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import styles from "./portal-layout.module.scss";

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
}: {
	children: ReactElement;
}) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token || isTokenExpired(token)) {
			localStorage.removeItem("token");
			router.push("/portal/login");
		} else {
			setIsAuthenticated(true);
			toast.success("Bem Vindo!");
		}
	}, [router]);

	return isAuthenticated ? (
		<div className={styles.main}>
			<SideBar />
			<ToastContainer />
			{children}
		</div>
	) : (
		<div>{children}</div>
	);
}
