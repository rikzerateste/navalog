import SideBar from "@/components/portal/sideBar";
import sideBarStyles from "@/components/portal/sideBar/styles.module.scss";
import styles from "./styles.module.scss";
import ListaPassageiros from "@/components/portal/listaPassageiros/index";
import React from "react";

const page = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <SideBar />
            </div>
            <ListaPassageiros />
        </div>
    )
}

export default page;