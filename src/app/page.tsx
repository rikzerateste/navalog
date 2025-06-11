"use client";
import Link from "next/link";
import Image from "next/image";

import HomeIcon from "/public/images/home-icon.svg";
import Logo from "/public/images/logowsdespachos.svg";
import Star from "/public/images/stars.svg";
import BannerWelcome from "/public/images/barcohome.svg";
import personIcon from "/public/images/person-icon.svg";
import peopleIcon from "/public/images/people-icon.svg";
import boatIcon from "/public/images/boat-icon.svg";

import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { Button } from "primereact/button";
import Numero from "@/components/landingpage/numero";

import axios from "axios";
import { useFormik } from "formik";

import { SuccessModal } from "./components/landingpage/successModal";
import { FailModal } from "./components/landingpage/failModal";

export default function Home() {
	const [boatCount, setBoatCount] = useState(0);
	const [clientCount, setClientCount] = useState(0);
	const [crewCount, setCrewCount] = useState(0);

	useEffect(() => {
		setBoatCount(384);
		setClientCount(136);
		setCrewCount(1604);
	}, []);

	const [isLoading, setLoading] = useState(false);
	const [successModal, setModalSuccess] = useState(false);
	const [failModal, setModalFail] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			message: "",
		},
		// validationSchema: Yup.object({
		// 	name: Yup.string().required("Campo obrigatório"),
		// 	email: Yup.string()
		// 		.email("E-mail inválido")
		// 		.required("Campo obrigatório"),
		// 	message: Yup.string().required("Campo obrigatório"),
		// }),
		onSubmit: (values) => handleSubmitForm(values),
	});

	const handleSubmitForm = (values: {
		name: string;
		email: string;
		message: string;
	}) => {
		setLoading(true);
		axios
			.post("/api/sendEmail", {
				messageBody: `Nome: ${values.name}\nEmail: ${values.email}\n\nMensagem: ${values.message}`,
				nameBody: values.name,
			})
			.then(() => {
				formik.resetForm();
				setModalSuccess(true);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				setModalSuccess(true);
			});
	};

	const closeModal = () => {
		setModalSuccess(false);
		setModalFail(false);
	};

	return (
		<main>
			<header className={styles.header}>
				<div className={styles.logotipo}>
					<Image src={Logo} alt="WS Despacho Logo" />
				</div>

				<nav className={styles.menu}>
					<Link href="#home" className="scroll-link">
						<Image src={HomeIcon} alt="Icone de casa" />
					</Link>

					<Link href="#servicos" className="scroll-link">
						Serviços
					</Link>

					<Link href="#missao" className="scroll-link">
						Sobre nós
					</Link>

					<Link href="#contato" className="scroll-link">
						Contato
					</Link>

					<Link href="#duvidas" className="scroll-link">
						Dúvidas
					</Link>
				</nav>
			</header>

			<div className={styles.welcome}>
				<div className={styles.content}>
					<div className={styles.textInfo}>
						<h1>
							Navegue pelos mares da burocracia com tranquilidade e eficiência.
						</h1>

						<p>
							Estamos há mais de 30 anos no mercado descomplicando a navegação
							fluvial administrativa.
						</p>

						<p className={styles.locationSpan}>
							<span className="material-symbols-rounded">location_on</span>{" "}
							Atendemos em todo Brasil!
						</p>
						<a href="#contato">
							<Button label="Fale conosco" severity="secondary" />
						</a>

						<div className={styles.dados}>
							<div className={styles.legendaDados}>
								<div className={styles.legendaTitle}>
									<h1>
										<Numero n={boatCount} />
									</h1>
									<Image src={boatIcon} alt="" />
								</div>
								<p>Embarcações</p>
							</div>

							<div className={styles.legendaDados}>
								<div className={styles.legendaTitle}>
									<h1>
										<Numero n={clientCount} />
									</h1>
									<Image src={personIcon} alt="" />
								</div>
								<p>Clientes</p>
							</div>

							<div className={styles.legendaDados}>
								<div className={styles.legendaTitle}>
									<h1>
										<Numero n={crewCount} />
									</h1>
									<Image src={peopleIcon} alt="" />
								</div>
								<p>Tripulantes</p>
							</div>
						</div>
					</div>

					<div className={styles.imageInfo}>
						<Image src={BannerWelcome} alt="Imagem de Barco"></Image>
					</div>
				</div>
			</div>

			<section id="servicos" className={styles.servicos}>
				<div className={styles.titulo}>
					<div className={styles.subTitulo}>
						<Image src={Star} alt="Icone estrela" />
						<p>Nossos</p>
					</div>

					<h1>Serviços</h1>
				</div>

				<div>
					<ul>
						<li>Abertura de rol portuário</li>
						<li>Agendamento de vistorias junto a capitania dos portos</li>
						<li>Controle de vistorias</li>
						<li>
							Emissão e renovação de título de inscrição da embarcação e
							atualização de provisões de registro junto ao tribunal marítimo e
							capitanias
						</li>
						<li>Outorga da Antaq</li>
						<li>Renovação de CIR</li>
						<li>Acompanhamento de vistorias</li>
						<li>Ascensão de categoria</li>
						<li>Emissão e renovação de CRA</li>
						<li>
							Licença Estação de Navio: Emissão e renovação junto a Anatel
						</li>
						<li>Pedido de despachos</li>
						<li>Segunda via da CIR</li>
						<li>Solicitação do Registro Especial Brasileiro</li>
					</ul>
				</div>
			</section>

			<section id="contato">
				{successModal && <SuccessModal closeModal={closeModal} />}
				{failModal && <FailModal closeModal={closeModal} />}
				{/* {isLoading && <Loading/>} */}
				<div className={styles.contato}>
					<div className={styles.conteudo}>
						<div className={styles.titulo}>
							<h1>Entre em contato</h1>
							<p>
								Atendemos de segunda a sexta das 07:30 às 12:00 - 13:30 às
								17:00. Obrigado por considerar a W.S. Comércio e Despachos
								Fluviais como seu parceiro confiável.
							</p>
						</div>

						<div className={styles.forms}>
							<form id="formulario" onSubmit={formik.handleSubmit}>
								<div className={styles.inputWrapper}>
									<span className="material-symbols-rounded">
										account_circle
									</span>
									<input
										id="name"
										name="name"
										type="text"
										placeholder="Nome completo"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.name}
										required
									/>
								</div>

								<div className={styles.inputWrapper}>
									<span className="material-symbols-rounded">
										alternate_email
									</span>
									<input
										id="email"
										name="email"
										type="email"
										placeholder="E-mail"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.email}
										required
									/>
								</div>

								<div className={styles.inputWrapper}>
									<span className="material-symbols-rounded">sms</span>
									<input
										id="message"
										name="message"
										type="text"
										placeholder="Mensagem"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.message}
										required
									/>
								</div>
							</form>
							<div className={styles.legendaForms}>
								<p>wsdespachantefluvial@gmail.com</p>
								<p>(14) 3641-1680 / (14) 3641-4141</p>
							</div>
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
					<span>MENU</span>
					<Link href="#home" className="scroll-link">
						Home
					</Link>
					<Link href="#servicos" className="scroll-link">
						Serviços
					</Link>
					<Link href="#missao" className="scroll-link">
						Sobre nós
					</Link>
					<Link href="#contato" className="scroll-link">
						Contato
					</Link>
					{/*<Link href="#duvidas">Duvidas</Link>*/}
				</div>

				<p>©Allrights reserved W.S. Comércio e Despachos Fluviais</p>
			</footer>
		</main>
	);
}
