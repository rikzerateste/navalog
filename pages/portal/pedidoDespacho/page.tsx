import SideBar from "@/components/portal/sideBar";
import sideBarStyles from "@/components/portal/sideBar/styles.module.scss";
import PedidoDespacho from "@/components/portal/pedidoDespacho/index";
import styles from "./styles.module.scss";
import React from "react";

const page = () => {

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <SideBar />
            </div>
            <PedidoDespacho />
        </div>
    )
}

export default page;