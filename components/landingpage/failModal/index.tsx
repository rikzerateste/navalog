import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useRef } from 'react';
import Image from "next/image"
import Button from "../button";
import Styles from "./styles.module.scss";
import FailIcon from "./system-solid-29-cross.gif"

interface ServerResponseModalProps {
    closeModal: () => void;
}

export function FailModal({ closeModal }: ServerResponseModalProps) {

    return (
        <div className={Styles.overlay}>
          <div className={Styles.modalContainer}>
            {/* <FiCheckCircle /> */}
            <Image className={Styles.img} src={FailIcon} alt={""}></Image>
            <p>Falha ao enviar email</p>
            <div className={Styles.okButtonContainer} onClick={closeModal}>
              <Button title="Fechar" kind={""} onClick={function (): void {
              throw new Error("Function not implemented.");
            } } type={""}/>
            </div>
          </div>
        </div>
      );
}

