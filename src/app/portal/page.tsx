"use client";
import Image from "next/image";
import LogoWS from "/public/images/sidebar/wsicon64x64.svg";
import PenIcon from "/public/images/pen-icon.svg";
import PaperIcon from "/public/images/paper-icon.svg";
import styles from "./portal.module.scss";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/portal/login");
			return;
		}

		setLoading(false);
	}, [router]);

	return loading ? (
		<div className={styles.spinner}>
			<ProgressSpinner
				style={{ width: "20px", height: "20px" }}
				strokeWidth="8"
				animationDuration=".5s"
			/>

			<p>Carregando portal...</p>
		</div>
	) : (
		<div className={styles.container}>
			<div className={styles.titulo}>
				<Image src={LogoWS} alt="logo"></Image>
				<h1>Bem-vindo(a) ao sistema WS Despachos Fluviais</h1>
			</div>

			<div className={styles.conteudo}>
				<div className={styles.card}>
					<Image src={PenIcon} alt=""></Image>
					<p>Cadastre empresas, embarcações e seus tripulantes</p>
				</div>

				<div className={styles.card}>
					<Image src={PaperIcon} alt=""></Image>
					<p>Gere pedidos de despacho, lista de passageiros e CTS</p>
				</div>
			</div>
		</div>
	);
}
