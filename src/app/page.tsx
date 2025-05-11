import Header from "@//app/components/landingpage/header";
import Welcome from "@//app/components/landingpage/welcome";
import Servicos from "@//app/components/landingpage/servicos";
import Missao from "@//app/components/landingpage/missao";
import Contato from "@//app/components/landingpage/contato";
import Duvidas from "@//app/components/landingpage/perguntas";
import Footer from "@//app/components/landingpage/footer";
import VagaEmprego from "@//app/components/landingpage/vagas";

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
