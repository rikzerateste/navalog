import Header from "@/components/landingpage/header";
import Welcome from "@/components/landingpage/welcome";
import Servicos from "@/components/landingpage/servicos";
import Missao from "@/components/landingpage/missao";
import Contato from "@/components/landingpage/contato";
import Duvidas from "@/components/landingpage/perguntas";
import Footer from "@/components/landingpage/footer";
import VagaEmprego from "@/components/landingpage/vagas";

export default function Home() {
	return (
		<main>
			<section id="home"></section>
			<Header />
			<Welcome />
			<section id="servicos"></section>
			<Servicos />
			<section id="missao"></section>
			<Missao />
			<section id="contato"></section>
			<Contato />
			<section id="duvidas"></section>
			<Duvidas />
			<section id="vagas"></section>
			<VagaEmprego />
			<Footer />
		</main>
	);
}
