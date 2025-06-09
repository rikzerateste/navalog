import { Button } from "primereact/button";
import Image from "next/image";
import styles from "./styles.module.scss";
import FailIcon from "./system-solid-29-cross.gif";

interface ServerResponseModalProps {
	closeModal: () => void;
}

export function FailModal({ closeModal }: ServerResponseModalProps) {
	return (
		<div className={styles.overlay}>
			<div className={styles.modalContainer}>
				<Image className={styles.img} src={FailIcon} alt={""}></Image>
				<p>Falha ao enviar email</p>
				<div className={styles.okButtonContainer} onClick={closeModal}>
					<Button label="Fechar" />
				</div>
			</div>
		</div>
	);
}
