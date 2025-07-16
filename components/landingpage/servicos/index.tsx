import Styles from "./servicos.module.scss"
import Image from "next/image"

const Servicos = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.titulo}>
                <h1>Serviços</h1>
            </div>

            <div className={Styles.conteudo}>
                <ul>
                    <li>Alteração de listas de tripulantes</li>
                    <li>Auto de infração, deslacramento e laudo pericial</li>
                    <li>Certificado de Registro de Armador</li>
                    <li>Embarque e desembarque de tripulante</li>
                    <li>Emissão e Renovação do Seguro obrigatório</li>
                    <li>Inscrição e renovação de documentos de embarcação</li>
                    <li>Inscrição de cursos junto a Marinha</li>
                    <li>Outorga da Anatel (emissão e renovação licença de estação de navio junto a Anatel)</li>
                    <li>Outorga da Antaq</li>
                    <li>Pedido de passe de saída junto a Marinha do Brasil</li>
                    <li>Registro Especial Brasileiro (REB)</li>
                    <li>Renovação de arrais armador</li>
                    <li>Renovação e atualização de CIR</li>
                </ul>
                <Image
                    src="/images/fig_service.png"
                    alt="Descrição da imagem para acessibilidade"
                    width={500} 
                    height={500} 
                />
            </div>
        </div>
    )
}

export default Servicos