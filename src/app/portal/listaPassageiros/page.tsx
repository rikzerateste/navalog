import SideBar from "@/components/portal/sideBar";
import styles from "@/styles/pages/base.module.scss";
import ListaPassageirosComponent from "@/components/portal/listaPassageiros";

export default function ListaPassageiros() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<SideBar />
			</div>

			<ListaPassageirosComponent />
		</div>
	);
}
