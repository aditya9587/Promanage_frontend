import React from "react";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.userControl}>
        <div className={styles.sideDashboard}>
          <img src="/images/codesandbox.png" alt="" />
          <h4>Pro Manage</h4>
        </div>
        <div className={styles.sideDashboard}>
          <img src="/images/layout.png" alt="" />
          <p>Board</p>
        </div>
        <div className={styles.sideDashboard}>
          <img src="/images/database.png" alt="" />
          <p>Analytics</p>
        </div>
        <div className={styles.sideDashboard}>
          <img src="/images/settings.png" alt="" />
          <p>Settings</p>
        </div>
        <div className={styles.logout}>
          <img src="/images/Logout.png" alt="" />
          <p>Logout</p>
        </div>
      </div>
      <div className={styles.mainDash}>
        <div className={styles.mainDash1}>
          <h3>Welcome! Kumar</h3>
          <div>12th Jan, 2024</div>
        </div>

        <div className={styles.mainDash2}>
          <div>
            <h2>Board</h2>
            <p>add people</p>
          </div>

          <select>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
          </select>
        </div>

        <div className={styles.group}>
          <div className={styles.insideGroup}>
            <div className={styles.inside1}>
              <span>backlog</span>
              <img src="/images/collapse.png" alt="" />
            </div>
          </div>

          <div className={styles.insideGroup}>
            <div className={styles.inside1}>
              <span>To do</span>

              <img src="/images/add.png" alt="" />
              <img src="/images/collapse.png" alt="" />
            </div>
          </div>
          <div className={styles.insideGroup}>
            <div className={styles.inside1}>
              <span>In progress</span>
              <img src="/images/collapse.png" alt="" />
            </div>
          </div>
          <div className={styles.insideGroup}>
            <div className={styles.inside1}>
              <span>Done</span>
              <img src="/images/collapse.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
