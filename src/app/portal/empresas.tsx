import styles from "@/app/styles/pages/base.module.scss";
import EmpresasComponent from "@/app/components/portal/empresas";
import SideBar from "@/app/components/portal/sideBar";

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
