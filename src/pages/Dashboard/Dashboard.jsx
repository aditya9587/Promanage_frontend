import React, { useEffect, useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import { contextUser } from "../../context/UserContext";
import AddTask from "../../components/Addtask/AddTask";

function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");
  const [todoModal, setTodoModal] = useState(false);

  const { signup, userName } = useContext(contextUser);

  useEffect(() => {
    const date = new Date();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const dateFormat = `${date.getDate()}th, ${month}, ${date.getFullYear()}`;
    setCurrentDate(dateFormat);

    const firstNAme = userName.split(" ");
  }, []);

  function showTodoModal() {
    setTodoModal(true);
  }

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
          <h3>Welcome! {signup.name} </h3>
          <div>{currentDate}</div>
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

              <img src="/images/add.png" alt="" onClick={showTodoModal} />
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
      </div >
      {todoModal ? <AddTask /> : null}
    </div>
  );
}

export default Dashboard;
