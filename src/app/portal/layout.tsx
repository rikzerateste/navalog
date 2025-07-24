"use client";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import styles from "./portal-layout.module.scss";
import SideBar from "@/components/portal/sideBar";
//import SideBar from "@/components/portal/sidebar";

export default function PortalPageLayout({
	children,
}: {
	children: ReactElement;
}) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const isTokenExpired = (token: string) => {
		const payload = JSON.parse(atob(token.split(".")[1]));
		const expiry = payload.exp * 1000;

		return Date.now() > expiry;
	};

	useEffect(() => {
		const token = localStorage.getItem("token") || "";

		if (!token || isTokenExpired(token)) {
			setIsAuthenticated(false);
			router.push("/portal/login");
		} else {
			setIsAuthenticated(true);
		}
	}, [router]);

	return (
		<div className={styles.main}>
			{isAuthenticated && <SideBar />}
			{children}
		</div>
	);
}
