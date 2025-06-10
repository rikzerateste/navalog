import styles from "@/styles/pages/base.module.scss";
import SideBar from "@/components/portal/sidebar";
import CtsComponent from "@/components/portal/cartaoTripulantes/index";

export default function CartaoTripulantes() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<SideBar />
			</div>

			<CtsComponent />
		</div>
	);
}
