import SideBar from "@/app/components/portal/sideBar";
import styles from "@/app/styles/pages/base.module.scss";
import TripulantesComponent from "@/app/components/portal/tripulantes";

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
