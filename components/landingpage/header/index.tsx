import Link from "next/link"
import Image from "next/image"
import Styles from "./header.module.scss"


const Header = () => {
   
    return(
        <header className={Styles.header}>
            <div className={Styles.logotipo}>
                {<Image src="/images/LogoFer2.png" alt={""} width={40} height={40}  ></Image>}
                <Link href="#welcome" className="scroll-link">Fernanda Pestana Despachante Fluvial</Link>
            </div>
            <div className={Styles.menu}>
                <Link href="#servicos" className="scroll-link">Serviços</Link>
                <Link href="#contato" className="scroll-link">Localização</Link>
                
                {/* <a href="https://wa.me/+5514998487774" target="_blank" rel="noopener noreferrer"> */}
                    <button id="btnwhats">
                        {<Image src="/images/iconWhats.png" alt={""} width={16} height={16}></Image>}
                        Contatar
                    </button>
                {/* </a> */}
            </div>
        </header>
    )
}

export default Header