import Image from "next/image"
import Styles from "./footer.module.scss"

const Footer = () => {
    return(
        <footer className={Styles.footer}>
            <div className={Styles.menu}>
                {<Image src="/images/LogoFerRodape.png" alt={""} width={64} height={64}  ></Image>}
            </div>
            
            <p>©Todos os direitos reservados. Fernanda Pestana Despachante Fluvial</p>
        </footer>
    )
}

export default Footer