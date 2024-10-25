import React, { useEffect, useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import AddTask from "../../components/Addtask/AddTask";
import Logout from "../../components/Logout/Logout";
import Displaytodo from "../../components/Displaytodo/Displaytodo";
import { getTodos, updateTaskStatus } from "../../services/Userlogin";


function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");
  const [todoModal, setTodoModal] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const collapseAllCard = () => {  //not working todo
    setShowChecklist(false);
  };

  useEffect(() => {
    const date = new Date();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const dateFormat = `${date.getDate()}th, ${month}, ${date.getFullYear()}`;
    setCurrentDate(dateFormat);
  }, []);

  useEffect(() => {
    async function fetchTask() {
      const response = await getTodos();
      console.log(response);
      setTasks(response.data.data);
    }
    fetchTask();
  }, []);

  async function handleStatusChange(mainID, newStatus) {
    const updatedTask = tasks.map((task) =>
      task._id === mainID ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTask);
    await updateTaskStatus(mainID, newStatus);
  }

  async function handleDeleteTask(id) {

    
  }

  function showTodoModal() {
    setTodoModal(true);
  }

  const logout = () => {
    setlogoutModal(true);
  };

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
          <p onClick={logout}>Logout</p>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.mainDash}>
          <div className={styles.mainDash1}>
            <h3>Welcome! Name </h3>
            <div>{currentDate}</div>
          </div>

          <div className={styles.mainDash2}>
            <div>
              <h2>Board</h2>
              {/* <p>add people</p> */}
            </div>

            <select>
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="year">This year</option>
            </select>
          </div>
        </div>

        <div className={styles.todoGroup}>
          <div className={styles.insideGroup}>
            <div className={styles.taskHeading}>
              <span>backlog</span>
              <img src="/images/collapse.png" alt="" />
            </div>
            <div>
              {tasks
                .filter((item) => item.status === "backlog")
                .map((item) => (
                  <Displaytodo
                    key={item._id}
                    tasks={[item]}
                    onStatusChange={handleStatusChange}
                  />
                ))}
            </div>
          </div>

          <div className={styles.insideGroup}>
            <div className={styles.inside1}>
              <div className={styles.taskHeading}>
                <span>To do</span>
                <img src="/images/add.png" alt="" onClick={showTodoModal} />
                <img
                  src="/images/collapse.png"
                  alt=""
                  onClick={collapseAllCard}
                />
              </div>
              <div>
                {tasks
                  .filter((item) => item.status === "todo")
                  .map((item) => (
                    <Displaytodo
                      key={item._id}
                      tasks={[item]}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.insideGroup}>
            <div className={styles.taskHeading}>
              <span>In progress</span>
              <img src="/images/collapse.png" alt="" />
            </div>
            <div>
              {tasks
                .filter((item) => item.status === "inProgress")
                .map((item) => (
                  <Displaytodo
                    key={item._id}
                    tasks={[item]}
                    onStatusChange={handleStatusChange}
                  />
                ))}
            </div>
          </div>
          <div className={styles.insideGroup}>
            <div className={styles.taskHeading}>
              <span>Done</span>
              <img src="/images/collapse.png" alt="" />
            </div>
            <div>
              {tasks
                .filter((item) => item.status === "done")
                .map((item) => (
                  <Displaytodo
                    key={item._id}
                    tasks={[item]}
                    onStatusChange={handleStatusChange}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {todoModal ? <AddTask onClose={() => setTodoModal(false)} /> : null}
      {logoutModal ? <Logout onClose={() => setlogoutModal(false)} /> : null}
    </div>
  );
}

export default Dashboard;
