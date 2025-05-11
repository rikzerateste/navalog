import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styles from "./styles.module.scss"
import ButtonCustom from "../button"

interface ModalLogoutProps {
    open: boolean;
    onClose: () => void;
}

const ModalLogout: React.FC<ModalLogoutProps> = ({ open, onClose }) => {
    const [visible, setVisible] = useState(open);

    useEffect(() => {
        setVisible(open);
    }, [open]);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const footerContent = (
        <div className={styles.botao}>

            <ButtonCustom tipoBotao='cancelar' title="Não" tamanho="10em" onClick={onClose} />
            <ButtonCustom tipoBotao='normal' title="Sim" onClick={logout} tamanho="10em" />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Sair"  className={styles.container}
            visible={true} closable={false}  style={{ width: '50vw', }} onHide={() => { setVisible(false); onClose(); }} footer={footerContent}>
                <p className="l-0">
                    Você tem certeza que quer sair do sistema?
                </p>
            </Dialog>
        </div>
    );
};

export default ModalLogout;
