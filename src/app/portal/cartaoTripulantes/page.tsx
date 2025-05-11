import SideBar from "@/src/app/components/portal/sideBar";
import sideBarStyles from "@/components/portal/sideBar/styles.module.scss";
import styles from "./styles.module.scss";
import CtsComponent from "@/src/app/components/portal/cartaoTripulantes/index";
import React from "react";

const page = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <SideBar/>
            </div>
            <CtsComponent/>
        </div>
    )
}

export default page;
