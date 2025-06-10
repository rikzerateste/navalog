import React from 'react';
import { Dialog } from 'primereact/dialog';
import ButtonCustom from "../button"
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

            <ButtonCustom tipoBotao='cancelar' title="Não" tamanho="10em" onClick={onHide} />
            <ButtonCustom tipoBotao='normal' title="Sim" onClick={onConfirm} tamanho="10em" />
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
