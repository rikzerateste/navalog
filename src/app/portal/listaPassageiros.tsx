import SideBar from "@/app/components/portal/sideBar";
import styles from "@/app/styles/pages/base.module.scss";
import ListaPassageirosComponent from "@/app/components/portal/listaPassageiros";

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
