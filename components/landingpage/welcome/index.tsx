'use client'

import Styles from "./welcome.module.scss";
import Image from "next/image";
import React from 'react';


const Welcome = () => {

    return(
        <div className={Styles.container}>
            <div className={Styles.content}>
                <div className={Styles.textInfo}>
                    <h1>
                    Soluções completas para navegação
                    </h1>

                    <p>
                    Cuidamos da burocracia para que você se concentre no que realmente importa: navegar com tranquilidade. Oferecemos serviços especializados em regularização de embarcações, documentação fluvial e assessoria completa.
                    </p>

                    <div className={Styles.buttoncontainer}>
                        <a href="#servicos">
                            <button className={Styles.btn1}>Saiba Mais</button>
                        </a>
                        <a href="https://wa.me/+5514998487774" target="_blank" rel="noopener noreferrer">
                            <button className={Styles.btn2}>
                                Entre em contato
                                {<Image src="/images/arrow.png" alt={""} width={16} height={16}></Image>}
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;