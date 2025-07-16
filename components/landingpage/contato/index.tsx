'use client';

import Styles from "./contato.module.scss"


const Contato = () => {
    return (
        <>
            <div className={Styles.container}>
                <div className={Styles.conteudo}>
                    <div className={Styles.titulo}>
                    <h1>Contate-nos</h1>
                    <p>Atendemos de segunda a sexta das <b>07:30 às 12:00 - 13:30 às 17:00.
                    </b><br></br> Rua Juvenal Pompeu, 179. Vila São José, Barra Bonita-SP</p>
                    </div>
                    <div className={Styles.titulo}>
                    
                    <p><b>ferpestanadespachantefluvial@gmail.com</b></p>
                    <p><b>(14) 99848-7775</b></p>
                    </div>
                </div>
            
                <div className={Styles.mapa}>
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1752516639169!5m2!1spt-BR!2sbr!6m8!1m7!1sPzuCIPx8Z5siR7eJtF5dWg!2m2!1d-22.4920317301662!2d-48.55647945021897!3f340.9124889437429!4f-13.29135232859474!5f0.4000000000000002"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={Styles.iframe}
                    />
                </div>
            </div>
        </>
    )
}

export default Contato