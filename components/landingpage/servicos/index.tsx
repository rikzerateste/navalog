import Styles from "./servicos.module.scss"
import Image from "next/image"
import Star from "../../../public/images/stars.svg"

const Servicos = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.titulo}>
                <div className={Styles.subTitulo}>
                    <Image src={Star} alt="Icone estrela"/>
                    <p>Nossos</p>
                </div>
                <h1>Serviços</h1>
            </div>

            <div className={Styles.conteudo}>
                <ul>
                    <li>Abertura de rol portuário</li>
                    <li>Agendamento de vistorias junto a capitania dos portos</li>
                    <li>Controle de vistorias</li>
                    <li>Emissão e renovação de título de inscrição da embarcação e atualização de provisões de registro junto ao tribunal marítimo e capitanias</li>
                    <li>Outorga da Antaq</li>
                    <li>Renovação de CIR</li>
                    <li>Acompanhamento de vistorias</li>
                    <li>Ascensão de categoria</li>
                    <li>Emissão e renovação de CRA</li>
                    <li>Licença Estação de Navio: Emissão e renovação junto a Anatel</li>
                    <li>Pedido de despachos</li>
                    <li>Segunda via da CIR</li>
                    <li>Solicitação do Registro Especial Brasileiro</li>
                </ul>
            </div>
        </div>
    )
}

export default Servicos