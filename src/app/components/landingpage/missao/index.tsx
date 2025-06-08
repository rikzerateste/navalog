import Styles from "./missao.module.scss";
import Image from "next/image";
import Rocket from "/public/images/missao-rocket-icon.svg";
import Imagem1 from "/public/images/imagem-barra-1.png";
import Imagem2 from "/public/images/imagem-barra-2.png";

const Missao = () => {
	return (
		<div id="missao" className={Styles.container}>
			<div className={Styles.titulo}>
				<div className={Styles.subTitulo}>
					<Image src={Rocket} alt="Icone foguete" />
					<p>Nossa missão</p>
				</div>
				<h1>Descomplicar a navegação fluvial administrativa</h1>
			</div>

			<div className={Styles.conteudo}>
				<div>
					<p>
						Somos a <b>W.S. Comércio e Despachos Fluviais</b>, fundada em 1993,
						atuamos há 30 anos no interior de São Paulo, no município de Barra
						bonita atendendo e prestando serviços para todo o país.
					</p>
					<Image
						className={Styles.img}
						src={Imagem1}
						alt="Imagem de barra bonita 1"
					/>
				</div>

				<div>
					<p>
						Cuidando da parte documental das embarcações e suas correspondentes
						empresas, com uma equipe especializada optando sempre pela qualidade
						e satisfação do cliente.
					</p>
					<Image
						className={Styles.img}
						src={Imagem2}
						alt="Imagem de barra bonita 2"
					/>
				</div>
			</div>
		</div>
	);
};

export default Missao;
