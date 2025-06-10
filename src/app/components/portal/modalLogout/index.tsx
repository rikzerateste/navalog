"use client";
import styles from "./styles.module.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useRouter } from "next/navigation";

interface ModalLogoutProps {
	open: boolean;
	onClose: () => void;
}

export default function ModalLogout({ open, onClose }: ModalLogoutProps) {
	const router = useRouter();

	const logout = () => {
		localStorage.removeItem("token");
		router.push("/");
	};

	const footerContent = (
		<div className={styles.footer}>
			<Button label="Não" severity="secondary" onClick={onClose} />
			<Button label="Sim" onClick={logout} />
		</div>
	);

	return (
		<div className="card flex justify-content-center">
			<Dialog
				header="Deseja mesmo sair do sistema?"
				className={styles.container}
				closable={false}
				visible={open}
				style={{ width: "50vw" }}
				onHide={onClose}
				footer={footerContent}
			/>
		</div>
	);
}
