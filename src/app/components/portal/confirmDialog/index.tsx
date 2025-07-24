import React from 'react';
import { Dialog } from 'primereact/dialog';
//import ButtonCustom from "../button"
import { Button } from "primereact/button";
import styles from './styles.module.scss'

interface ConfirmDialogProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ visible, onHide, onConfirm, message }) => {

    const footerContent = (
        <div className={styles.botao}>

            <Button  label="Não" onClick={onHide} />
            <Button  label="Sim" onClick={onConfirm} />
        </div>
    );

  return (

      <Dialog header="Excluir"  className={styles.container}
        visible={visible} closable={false}       contentClassName={styles.modal}
        style={{ width: '50vw' }} onHide={onHide} footer={footerContent}>
            <p className="l-0">
              {message}
            </p>
        </Dialog>


);
};


export default ConfirmDialog;
