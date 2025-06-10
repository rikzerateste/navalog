import SideBar from "@/components/portal/sidebar";
import styles from "@/styles/pages/base.module.scss";
import TripulantesComponent from "@/components/portal/tripulantes";

export default function Tripulantes() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<SideBar />
			</div>
			<TripulantesComponent />
		</div>
	);
}
