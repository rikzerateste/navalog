import Link from "next/link";
import Image from "next/image";
import Styles from "./header.module.scss";
import HomeIcon from "/public/images/home-icon.svg";
import Logo from "/public/images/logowsdespachos.svg";

const Header = () => {
	return (
		<header className={Styles.header}>
			<div className={Styles.logotipo}>
				<Image src={Logo} alt="WS Despacho Logo" />
			</div>

			<div className={Styles.menu}>
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
			</div>
		</header>
	);
};

export default Header;
