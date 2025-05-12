"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { Button } from 'primereact/button';
import styles from "./styles.module.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import WSLogo from "/public/images/sidebar/wsicon-navbar.svg";
import WSTexto from "/public/images/sidebar/wstext-navbar.svg";
import { HomeIcon } from "./iconsSvg/index";
import { EmpresasIcon } from "./iconsSvg/index";
import EmbarcacoesIcon from "/public/images/sidebar/embarcacoesPage-icon.svg";
import TripulantesIcon from "/public/images/sidebar/tripulantesPage-icon.svg";
import ListaPassageirosIcon from "/public/images/sidebar/listaPassageirosPage-icon.svg";
import PedidosDespachoIcon from "/public/images/sidebar/pedidoDeDespachoPage-icon.svg";
import CTSIcon from "/public/images/sidebar/CTSPage-icon.svg";
import DeclaracaoGeralIcon from "/public/images/sidebar/declaracaoGeralPage-icon.svg";
import SairIcon from "/public/images/sidebar/sairPage-icon.svg";
import ModalLogout from "../modalLogout/index";
import Link from "next/link";

const SideBar = () => {
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

	const handleItemClick = (tab: any) => {
		setActiveTab(tab);
		console.log(activeTab);
	};

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
							onClick={(e) => handleItemClick("portal")}
						>
							<HomeIcon active={activeTab === "portal"} />
							<span>Início</span>
						</Link>

						<div className={styles.cadastros}>
							<span className={styles.categoriaMenu}>Cadastros</span>
							<Link
								href="/portal/empresas/page"
								className={`${styles.button} ${
									activeTab === "empresas" ? styles.active : ""
								}`}
								onClick={(e) => handleItemClick("empresas")}
							>
								<EmpresasIcon active={activeTab === "empresas"} />
								<span>Empresas</span>
							</Link>
							<Link
								href="/portal/embarcacoes/page"
								className={`${styles.button} ${
									activeTab === "embarcacoes" ? styles.active : ""
								}`}
								onClick={(e) => handleItemClick("embarcacoes")}
							>
								<Image src={EmbarcacoesIcon} alt={""}></Image>
								<span>Embarcações</span>
							</Link>
							<Link
								href="/portal/tripulantes/page"
								className={`${styles.button} ${
									activeTab === "tripulantes" ? styles.active : ""
								}`}
								onClick={(e) => handleItemClick("tripulantes")}
							>
								<Image src={TripulantesIcon} alt={""}></Image>
								<span>Tripulantes</span>
							</Link>
						</div>

						<div className={styles.despachos}>
							<span className={styles.categoriaMenu}>Despachos</span>
							<Link
								href="/portal/listaPassageiros/page"
								className={`${styles.button} ${
									activeTab === "listaPassageiros" ? styles.active : ""
								}`}
								onClick={(e) => handleItemClick("listaPassageiros")}
							>
								<Image src={ListaPassageirosIcon} alt={""}></Image>
								<span>Lista de passageiros</span>
							</Link>
							<Link
								href="/portal/pedidoDespacho/page"
								className={`${styles.button} ${
									activeTab === "pedidoDespacho" ? styles.active : ""
								}`}
								onClick={(e) => handleItemClick("pedidoDespacho")}
							>
								<Image src={PedidosDespachoIcon} alt={""}></Image>
								<span>Pedido de despacho</span>
							</Link>
							<Link
								href="/portal/cartaoTripulantes/page"
								className={`${styles.button} ${
									activeTab === "cartaoTripulantes" ? styles.active : ""
								}`}
								onClick={(e) => handleItemClick("cartaoTripulantes")}
							>
								<Image src={CTSIcon} alt={""}></Image>
								<span>Cartão de Tripulação de Segurança</span>
							</Link>
						</div>
					</div>
				</div>

				<div className={styles.sair}>
					<a className={styles.button} onClick={logout}>
						<Image src={SairIcon} alt={""}></Image>
						<span>Sair</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default SideBar;
