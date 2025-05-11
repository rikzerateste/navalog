import SideBar from "@/app/components/portal/sideBar";
import PedidoDespachoComponent from "@/app/components/portal/pedidoDespacho";
import styles from "@/app/styles/pages/base.module.scss";

export default function PedidoDespacho() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<SideBar />
			</div>
			<PedidoDespachoComponent />
		</div>
	);
}
