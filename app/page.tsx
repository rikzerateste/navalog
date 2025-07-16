import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/landingpage/header";
import Welcome from "@/components/landingpage/welcome";
import Servicos from "@/components/landingpage/servicos";
import Missao from "@/components/landingpage/missao";
import Contato from "@/components/landingpage/contato";
import Duvidas from "@/components/landingpage/perguntas";
import Footer from "@/components/landingpage/footer";


export default function Home() {
  return (
    <main className={styles.main}>
          <section id="home"></section>
          <Header/>
          <Welcome/>
          <section id="servicos"></section>
          <Servicos/>
          <section id="contato"></section>
          <Contato/>
          {/* <section id="missao"></section>
          <Missao/> */}
          
          <Footer/>
    </main> 
  );
}
