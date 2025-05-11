import Header from "@/src/app/components/landingpage/header";
import Welcome from "@/src/app/components/landingpage/welcome";
import Servicos from "@/src/app/components/landingpage/servicos";
import Missao from "@/src/app/components/landingpage/missao";
import Contato from "@/src/app/components/landingpage/contato";
import Duvidas from "@/src/app/components/landingpage/perguntas";
import Footer from "@/src/app/components/landingpage/footer";
import VagaEmprego from "@/src/app/components/landingpage/vagas"

export default function Home() {
  return (
    <main>
			<section id="home"></section>
			<Header/>
			<Welcome/>
			<section id="servicos"></section>
			<Servicos/>
			<section id="missao"></section>
			<Missao/>
			<section id="contato"></section>
			<Contato/>
			<section id="duvidas"></section>
			<Duvidas/>
			<section id="vagas"></section>
			<VagaEmprego/>
			<Footer/>
    </main>
  );
}
