import Styles from "./vaga.module.scss";
import Image from "next/image";
import JobIcon from "../../../public/images/job-icon.svg";

const VagaEmprego = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.titulo}>
                <h1>Vagas que recomendamos!</h1>
                <div className={Styles.subTitulo}>
                    <Image src={JobIcon} alt="Ícone de Vaga" />
                    <p>Novas Vagas</p>
                </div>
            </div>

            <div className={Styles.conteudo}>
                <h1>WS Despachos Fluviais</h1>
                <p>Estamos em busca de profissionais para preencher as seguintes vagas:</p>
                <ul>
                    <li><strong>Piloto Fluvial</strong></li>
                    <li><strong>Mestre Fluvial</strong></li>
                    <li><strong>Condutor de Máquinas</strong></li>
                </ul>
                <p>Enviar currículos para: <strong>wsdespachantefluvial@gmail.com</strong></p>

                <h1>SAARA Porto de Areia</h1>
                <h3>Local: Mira Estrela/SP ou Riolândia/SP</h3>
                <p>
                    A SAARA Porto de Areia está contratando para as seguintes vagas:
                </p>
                <ul>
                    <li>01 <strong>Contramestres Fluvial</strong></li>
                    <li>01 <strong>Marinheiro Fluvial de Máquinas</strong></li>
                </ul>
                <p>
                    Envie seu currículo para: <strong>17 99635-1157</strong>
                </p>

                <h1>Theodoro</h1>
                <h3>Local: Adolfo/SP</h3>
                <p>
                    A empresa Theodoro está contratando para as seguintes vagas:
                </p>
                <ul>
                    <li>01 <strong>Piloto Fluvial</strong></li>
                    <li>01 <strong>Contramestre Fluvial</strong></li>
                </ul>
                <p>
                    Envie seu currículo para: <strong>17 99701-6374</strong>
                </p>

                <h1>Consórcio Nova Avanhandava</h1>
                <h3>Local: Buritama/SP</h3>
                <p>
                    A Consórcio Nova Avanhandava está contratando para as seguintes vagas:
                </p>

                <ul>
                    <li>01 <strong>Condutor</strong></li>
                    <li>04 <strong>Contramestres - Nível C4</strong></li>
                </ul>
                <p>
                    Para atuação em obra de derrocagem subaquática na Hidrovia Tietê-Paraná, localizada na cidade de Buritama - SP.
                </p>
                <p>
                    Enviar currículos para: <strong>alessandro.siqueira@dpbarros.com.br</strong> ou <strong>11 99594-3251</strong>
                </p>
            </div>
        </div>
    );
};

export default VagaEmprego;
