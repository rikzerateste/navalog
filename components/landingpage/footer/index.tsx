import Link from "next/link"
import Image from "next/image"
import Styles from "./footer.module.scss"
import HomeIcon from "../../public/images/home-icon.svg"


const Footer = () => {
    return(
        <footer className={Styles.footer}>
            <div className={Styles.menu}>
                <span>MENU</span>
                <Link href="#home" className="scroll-link">Home</Link>
                <Link href="#servicos" className="scroll-link">Serviços</Link>
                <Link href="#missao" className="scroll-link">Sobre nós</Link>
                <Link href="#contato" className="scroll-link">Contato</Link>
                {/*<Link href="#duvidas">Duvidas</Link>*/}
            </div>
            
            <p>©Allrights reserved W.S. Comércio e Despachos Fluviais</p>
        </footer>
    )
}

export default Footer