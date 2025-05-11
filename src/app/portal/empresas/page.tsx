import React from "react";
import Empresas from "../../components/portal/empresas/index"
import SideBar from "@/src/app/components/portal/sideBar";
import sideBarStyles from "@/components/portal/sideBar/styles.module.scss";
import styles from "./styles.module.scss";
import { copyStringIntoBuffer } from "pdf-lib";

const page = () => {



  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <SideBar />
      </div>
      <Empresas />
    </div>
  );
};

export default page;
