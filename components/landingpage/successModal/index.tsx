import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useRef } from 'react';
import Image from "next/image"
import Button from "../button";
import Styles from "./styles.module.scss";
import SuccessIcon from "./system-solid-31-check.gif"

interface ServerResponseModalProps {
    closeModal: () => void;
}

export function SuccessModal({ closeModal }: ServerResponseModalProps) {

    return (
        <div className={Styles.overlay}>
          <div className={Styles.modalContainer}>
            {/* <FiCheckCircle /> */}
            <Image className={Styles.img} src={SuccessIcon} alt={""}></Image>
            <p>Email enviado com sucesso!</p>
            <div className={Styles.okButtonContainer} onClick={closeModal}>
              <Button title="Fechar" kind={""} onClick={function (): void {} } type={""}/>
            </div>
          </div>
        </div>
      );
}

