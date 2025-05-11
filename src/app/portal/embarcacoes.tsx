import SideBar from "@/app/components/portal/sideBar";
import Embarcacao_Component from "@/app/components/portal/embarcacoes";
import styles from "@/app/styles/pages/base.module.scss";

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
