import { Button } from "primereact/button";
import Image from "next/image";
import styles from "./styles.module.scss";
import SuccessIcon from "./system-solid-31-check.gif";

interface ServerResponseModalProps {
	closeModal: () => void;
}

export function SuccessModal({ closeModal }: ServerResponseModalProps) {
	return (
		<div className={styles.overlay}>
			<div className={styles.modalContainer}>
				<Image className={styles.img} src={SuccessIcon} alt={""}></Image>
				<p>Email enviado com sucesso!</p>
				<div className={styles.okButtonContainer} onClick={closeModal}>
					<Button label="Fechar" />
				</div>
			</div>
		</div>
	);
}
