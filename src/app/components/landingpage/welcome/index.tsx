"use client";

import Button from "../button";
import Styles from "./welcome.module.scss";
import Image from "next/image";
import BannerWelcome from "/public/images/barcohome.svg";
import personIcon from "/public/images/person-icon.svg";
import peopleIcon from "/public/images/people-icon.svg";
import boatIcon from "/public/images/boat-icon.svg";
import Numero from "./numero";
import { useEffect, useState } from "react";

const Welcome = () => {
	const [boatCount, setBoatCount] = useState(0);
	const [clientCount, setClientCount] = useState(0);
	const [crewCount, setCrewCount] = useState(0);

	useEffect(() => {
		setBoatCount(384);
		setClientCount(136);
		setCrewCount(1604);
	});

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<div className={Styles.textInfo}>
					<h1>
						Navegue pelos mares da burocracia com tranquilidade e eficiência.
					</h1>

					<p>
						Estamos há mais de 30 anos no mercado descomplicando a navegação
						fluvial administrativa.
					</p>

					<p className={Styles.locationSpan}>
						<span className="material-symbols-rounded">location_on</span>{" "}
						Atendemos em todo Brasil!
					</p>
					<a href="#contato">
						<Button
							title={"Fale conosco"}
							kind={"secondary"}
							onClick={function (): void {}}
							type={""}
						/>
					</a>

					<div className={Styles.dados}>
						<div className={Styles.legendaDados}>
							<div className={Styles.legendaTitle}>
								<h1>
									<Numero n={boatCount} />
								</h1>
								<Image src={boatIcon} alt="" />
							</div>
							<p>Embarcações</p>
						</div>

						<div className={Styles.legendaDados}>
							<div className={Styles.legendaTitle}>
								<h1>
									<Numero n={clientCount} />
								</h1>
								<Image src={personIcon} alt="" />
							</div>
							<p>Clientes</p>
						</div>

						<div className={Styles.legendaDados}>
							<div className={Styles.legendaTitle}>
								<h1>
									<Numero n={crewCount} />
								</h1>
								<Image src={peopleIcon} alt="" />
							</div>
							<p>Tripulantes</p>
						</div>
					</div>
				</div>

				<div className={Styles.imageInfo}>
					<Image src={BannerWelcome} alt="Imagem de Barco"></Image>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
