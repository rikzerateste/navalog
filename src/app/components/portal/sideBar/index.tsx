"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "primereact/button";
import styles from "./sidebar.module.scss";

import WSLogo from "/public/images/sidebar/wsicon-navbar.svg";
import WSTexto from "/public/images/sidebar/wstext-navbar.svg";
import EmbarcacoesIcon from "/public/images/sidebar/embarcacoesPage-icon.svg";
import TripulantesIcon from "/public/images/sidebar/tripulantesPage-icon.svg";
import ListaPassageirosIcon from "/public/images/sidebar/listaPassageirosPage-icon.svg";
import PedidosDespachoIcon from "/public/images/sidebar/pedidoDeDespachoPage-icon.svg";
import CTSIcon from "/public/images/sidebar/CTSPage-icon.svg";
import SairIcon from "/public/images/sidebar/sairPage-icon.svg";

import ModalLogout from "../modalLogout/index";

export default function SideBar() {
	const [activeTab, setActiveTab] = useState("");
	const [openModal, setOpenModal] = useState(false);

	const logout = (e: any) => {
		e.preventDefault();
		setOpenModal(true);
	};

	const closeLogoutModal = () => {
		setOpenModal(false);
	};

	useEffect(() => {
		const path = window.location.pathname;

		const fragments = path.split("/");
		const lastFragment = fragments[fragments.length - 2];
		setActiveTab(lastFragment === "" ? "portal" : lastFragment);
	}, []);

	return (
		<>
			{openModal && <ModalLogout open={openModal} onClose={closeLogoutModal} />}

			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.logo}>
						<Image src={WSLogo} alt={""}></Image>
						<Image src={WSTexto} alt={""}></Image>
					</div>

					<div className={styles.menus}>
						<Link
							href="/portal"
							className={`${styles.button} ${
								activeTab === "portal" ? styles.active : ""
							}`}
							onClick={() => setActiveTab("portal")}
						>
							<i className="pi pi-home" />
							Início
						</Link>

						<div className={styles.cadastros}>
							<span className={styles.categoriaMenu}>Cadastros</span>

							<Link
								href="/portal/empresas"
								className={`${styles.button} ${
									activeTab === "empresas" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("empresas")}
							>
								<i className="pi pi-building" />
								Empresas
							</Link>

							<Link
								href="/portal/embarcacoes"
								className={`${styles.button} ${
									activeTab === "embarcacoes" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("embarcacoes")}
							>
								<Image src={EmbarcacoesIcon} alt={"embarcações"} />
								Embarcações
							</Link>

							<Link
								href="/portal/tripulantes"
								className={`${styles.button} ${
									activeTab === "tripulantes" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("tripulantes")}
							>
								<Image src={TripulantesIcon} alt={"tripulantes"} />
								Tripulantes
							</Link>
						</div>

						<div className={styles.despachos}>
							<span className={styles.categoriaMenu}>Despachos</span>

							<Link
								href="/portal/listaPassageiros"
								className={`${styles.button} ${
									activeTab === "listaPassageiros" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("listaPassageiros")}
							>
								<Image
									src={ListaPassageirosIcon}
									alt={"lista de passageiros"}
								/>
								Lista de passageiros
							</Link>

							<Link
								href="/portal/pedidoDespacho"
								className={`${styles.button} ${
									activeTab === "pedidoDespacho" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("pedidoDespacho")}
							>
								<Image src={PedidosDespachoIcon} alt={"pedido de despacho"} />
								Pedido de despacho
							</Link>

							<Link
								href="/portal/cartaoTripulantes"
								className={`${styles.button} ${
									activeTab === "cartaoTripulantes" ? styles.active : ""
								}`}
								onClick={() => setActiveTab("cartaoTripulantes")}
							>
								<Image
									src={CTSIcon}
									alt={"cartão de tripulação de segurança"}
								/>
								Cartão de Tripulação de Segurança
							</Link>
						</div>
					</div>
				</div>

				<footer className={styles.logout}>
					<Button
						onClick={logout}
						label="Sair"
						icon="pi pi-sign-out"
						severity="secondary"
					/>
				</footer>
			</div>
		</>
	);
}
