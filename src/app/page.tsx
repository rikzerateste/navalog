"use client";
import Link from "next/link";
import Image from "next/image";

import personIcon from "/public/images/person-icon.svg";
import peopleIcon from "/public/images/people-icon.svg";
import boatIcon from "/public/images/boat-icon.svg";

import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { Button } from "primereact/button";
import Numero from "@/components/landingpage/numero";

export default function Home() {
	const [boatCount, setBoatCount] = useState(0);
	const [clientCount, setClientCount] = useState(0);
	const [crewCount, setCrewCount] = useState(0);

	useEffect(() => {
		setBoatCount(384);
		setClientCount(136);
		setCrewCount(1604);
	}, []);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<main>
			<header className={styles.header}>
				<div className={styles.logotipo}>
					<Image
						src="/images/LogoFer2.png"
						alt="Logo despachante"
						width={40}
						height={40}
					/>

					<Link href="#welcome" className="scroll-link">
						Fernanda Pestana Despachante Fluvial
					</Link>
				</div>

				<div
					className={`${styles.hamburgerMenu} ${isMenuOpen ? styles.open : ""}`}
					onClick={toggleMenu}
				>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
					<div className={styles.bar}></div>
				</div>

				<div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
					<Link href="#servicos" className="scroll-link" onClick={toggleMenu}>
						Serviços
					</Link>
					<Link href="#contato" className="scroll-link" onClick={toggleMenu}>
						Localização
					</Link>
				</div>
			</header>

			<div className={styles.welcome}>
				<h1>Soluções completas para navegação</h1>

				<p>
					Cuidamos da burocracia para que você se concentre no que realmente
					importa: navegar com tranquilidade. Oferecemos serviços especializados
					em regularização de embarcações, documentação fluvial e assessoria
					completa.
				</p>

				<div className={styles.buttoncontainer}>
					<a href="#servicos">
						<button className={styles.btn1}>Saiba Mais</button>
					</a>
					<a
						href="https://wa.me/+5514998487774"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className={styles.btn2}>
							Entre em contato
							{
								<Image
									src="/images/arrow.png"
									alt={""}
									width={16}
									height={16}
								></Image>
							}
						</button>
					</a>
				</div>

				<a href="#contato">
					<Button label="Fale conosco" severity="secondary" />
				</a>
			</div>

			<section id="servicos" className={styles.servicos}>
				<div>
					<div className={styles.titulo}>
						<h1>Serviços</h1>
					</div>

					<div className={styles.conteudo}>
						<ul>
							<li>Alteração de listas de tripulantes</li>
							<li>Auto de infração, deslacramento e laudo pericial</li>
							<li>Certificado de Registro de Armador</li>
							<li>Embarque e desembarque de tripulante</li>
							<li>Emissão e Renovação do Seguro obrigatório</li>
							<li>Inscrição e renovação de documentos de embarcação</li>
							<li>Inscrição de cursos junto a Marinha</li>
							<li>
								Outorga da Anatel (emissão e renovação licença de estação de
								navio junto a Anatel)
							</li>
							<li>Outorga da Antaq</li>
							<li>Pedido de passe de saída junto a Marinha do Brasil</li>
							<li>Registro Especial Brasileiro (REB)</li>
							<li>Renovação de arrais armador</li>
							<li>Renovação e atualização de CIR</li>
						</ul>
					</div>
				</div>

				<div className={styles.imageService}>
					<Image
						src="/images/fig_service.png"
						alt="Descrição da imagem para acessibilidade"
						width={300}
						height={300}
					/>
				</div>
			</section>

			<section id="contato">
				<div className={styles.contato}>
					<div className={styles.conteudo}>
						<div className={styles.titulo}>
							<h1>Contate-nos</h1>
							<p>
								Atendemos de segunda a sexta das{" "}
								<b>07:30 às 12:00 - 13:30 às 17:00.</b>
								<br></br> Rua Juvenal Pompeu, 179. Vila São José, Barra
								Bonita-SP
							</p>
						</div>
						<div className={styles.titulo}>
							<p>
								<b>ferpestanadespachantefluvial@gmail.com</b>
							</p>
							<p>
								<b>(14) 99848-7775</b>
							</p>
						</div>

						<div className={styles.mapa}>
							<iframe
								src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1752516639169!5m2!1spt-BR!2sbr!6m8!1m7!1sPzuCIPx8Z5siR7eJtF5dWg!2m2!1d-22.4920317301662!2d-48.55647945021897!3f340.9124889437429!4f-13.29135232859474!5f0.4000000000000002"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className={styles.iframe}
							></iframe>
						</div>
					</div>

					<div className={styles.mapa}>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7372.50405603131!2d-48.56325291671458!3d-22.49472541119266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c74f7d2f4993b7%3A0x7385fc62826dd20d!2sWS%20Com%C3%A9rcio%20Despachos%20Fluviais!5e0!3m2!1spt-BR!2sbr!4v1712512761888!5m2!1spt-BR!2sbr"
							allowFullScreen={true}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className={styles.iframe}
						></iframe>
					</div>
				</div>
			</section>

			<footer className={styles.footer}>
				<div className={styles.menu}>
					<Image
						src="/images/LogoFerRodape.png"
						alt={""}
						width={64}
						height={64}
					></Image>
				</div>
				<p>
					Fernanda Pestana Despachante Fluvial<br></br>©Todos os direitos
					reservados.
				</p>
			</footer>
		</main>
	);
}
