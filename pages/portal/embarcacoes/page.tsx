import SideBar from "@/components/portal/sideBar";
import sideBarStyles from "@/components/portal/sideBar/styles.module.scss";
import Embarcacao_Component from "@/components/portal/embarcacoes";
import styles from "./styles.module.scss";
import React from "react";

const page = () => {
    return(
        <div className={styles.container}>
            <div className={styles.main}>
                <SideBar/>
            </div>
            <Embarcacao_Component/>
        </div>
    )
}

export default page;