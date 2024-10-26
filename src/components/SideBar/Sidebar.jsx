import React, { useState, useContext } from "react";
import styles from "./Sidebar.module.css";
import { contextUser } from "../../context/UserContext";
import Logout from "../Logout/Logout";

function Sidebar() {
  const [logoutModal, setlogoutModal] = useState(false);

  const { setActiveComponent } = useContext(contextUser);

  const logout = () => {
    setlogoutModal(true);
  };
  return (
    <div className={styles.userControl}>
        <div className={styles.sideDashboard}>
          <img src="/images/codesandbox.png" alt="" />
          <h4>Pro Manage</h4>
        </div>
        <div
          className={styles.sideDashboard}
          onClick={() => setActiveComponent("Board")}
        >
          <img src="/images/layout.png" alt="" />
          <p>Board</p>
        </div>
        <div
          className={styles.sideDashboard}
          onClick={() => setActiveComponent("Analytics")}
        >
          <img src="/images/database.png" alt="" />
          <p>Analytics</p>
        </div>
        <div
          className={styles.sideDashboard}
          onClick={() => setActiveComponent("Setting")}
        >
          <img src="/images/settings.png" alt="" />
          <p>Settings</p>
        </div>
        <div className={styles.logout}>
          <img src="/images/Logout.png" alt="" />
          <p onClick={logout}>Logout</p>
        </div>
      {logoutModal ? <Logout onClose={ () => setlogoutModal(false)} /> : null}
    </div>
  );
}

export default Sidebar;
