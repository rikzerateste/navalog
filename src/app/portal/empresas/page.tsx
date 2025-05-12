import styles from "@/styles/pages/base.module.scss";
import EmpresasComponent from "@/components/portal/empresas";
import SideBar from "@/components/portal/sideBar";

export default function Empresas() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<SideBar />
			</div>
			<EmpresasComponent />
		</div>
	);
}
