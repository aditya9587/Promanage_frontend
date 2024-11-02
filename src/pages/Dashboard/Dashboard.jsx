import React, { useState } from "react";
import styles from "./Dashboard.module.css";

import Sidebar from "../../components/SideBar/Sidebar";
import Board from "../../components/board/Board";
import Analytics from "../../components/Analytics/Analytics";
import Setting from "../../components/settings/Setting";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Board");

  function activeComponentValue(value) {
    setActiveComponent(value);
  }

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
      <Sidebar setValue={activeComponentValue} />

      <div className={styles.rightContainer}>{renderComponent()}</div>
    </div>
  );
}

export default Dashboard;
