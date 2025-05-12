import Image from "next/image";
import LogoWS from "/public/images/sidebar/wsicon64x64.svg";
import PenIcon from "/public/images/pen-icon.svg";
import PaperIcon from "/public/images/paper-icon.svg";
import styles from "./portal.module.scss";

export default function Page() {
	return (
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
