import Link from "next/link"
import Logo from "../../../public/images/logowsdespachos.svg"
import Image from "next/image"
import Styles from "./header.module.scss"
import HomeIcon from "../../../public/images/home-icon.svg"
import Button from "../button/index"


const Header = () => {
    return(
        <header className={Styles.header}>
            <div className={Styles.logotipo}>
                <Image src={Logo} alt={""}></Image>
            </div>
            <div className={Styles.menu}>
                <Link href="#home" className="scroll-link"><Image src={HomeIcon} alt="Icone de casa"/></Link>
                <Link href="#servicos" className="scroll-link">Serviços</Link>
                <Link href="#missao" className="scroll-link">Sobre nós</Link>
                <Link href="#contato" className="scroll-link">Contato</Link>
                <Link href="#duvidas">Dúvidas</Link>
            </div>
            
            {/*
            <div className={Styles.action}>
                <Button title="Fale conosco!"/>
            </div>
            */}
        </header>
    )
}

export default Header