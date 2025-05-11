import styles from "@/app/styles/pages/base.module.scss";
import SideBar from "@/app/components/portal/sideBar";
import CtsComponent from "@/app/components/portal/cartaoTripulantes/index";

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
