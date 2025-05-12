import SideBar from "@/components/portal/sideBar";
import Embarcacao_Component from "@/components/portal/embarcacoes";
import styles from "@/styles/pages/base.module.scss";

export default function Embarcacoes() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<SideBar />
			</div>

			<Embarcacao_Component />
		</div>
	);
}
