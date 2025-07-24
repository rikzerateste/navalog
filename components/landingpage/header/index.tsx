"use client";

import Link from "next/link";
import Image from "next/image";
import Styles from "./header.module.scss";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={Styles.header}>
            <div className={Styles.logotipo}>
                <Image src="/images/LogoFer2.png" alt="" width={40} height={40} />
                <Link href="#welcome" className="scroll-link">
                    Fernanda Pestana Despachante Fluvial
                </Link>
            </div>

            {/* Ícone do hambúrguer */}
            <div
                className={`${Styles.hamburgerMenu} ${isMenuOpen ? Styles.open : ""}`}
                onClick={toggleMenu}
            >
                <div className={Styles.bar}></div>
                <div className={Styles.bar}></div>
                <div className={Styles.bar}></div>
            </div>

            {/* Menu Condicional */}
            <div className={`${Styles.menu} ${isMenuOpen ? Styles.menuOpen : ""}`}>
                <Link href="#servicos" className="scroll-link" onClick={toggleMenu}>
                    Serviços
                </Link>
                <Link href="#contato" className="scroll-link" onClick={toggleMenu}>
                    Localização
                </Link>
                {/* <button id="btnwhats" onClick={toggleMenu}>
                    <Image src="/images/iconWhats.png" alt="" width={16} height={16} />
                    Contatar
                </button> */}
            </div>
        </header>
    );
};

export default Header;
