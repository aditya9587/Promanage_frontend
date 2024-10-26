import React, { useContext } from "react";
import styles from "./Dashboard.module.css";

import Sidebar from "../../components/SideBar/Sidebar";
import Board from "../../components/board/Board";
import Analytics from "../../components/Analytics/Analytics";
import Setting from "../../components/settings/Setting";
import { contextUser } from "../../context/UserContext";

function Dashboard() {
  const { activeComponent } = useContext(contextUser);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Board":
        return <Board />;
      case "Analytics":
        return <Analytics />;
      case "Setting":
        return <Setting />;
      default:
        return <Board />;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Sidebar />
      <div className={styles.rightContainer}>{renderComponent()}</div>
    </div>
  );
}

export default Dashboard;
