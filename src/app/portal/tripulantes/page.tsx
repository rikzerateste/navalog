import SideBar from "@/src/app/components/portal/sideBar";
import sideBarStyles from "@/components/portal/sideBar/styles.module.scss";
import TripulantesComponent from "@/src/app/components/portal/tripulantes/index"
import styles from "./styles.module.scss";
import React from "react";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <SideBar />
      </div>
      <TripulantesComponent/>
    </div>
  );
};

export default page;
