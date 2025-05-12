import SideBar from "@/components/portal/sideBar";
import PedidoDespachoComponent from "@/components/portal/pedidoDespacho";
import styles from "@/styles/pages/base.module.scss";

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
