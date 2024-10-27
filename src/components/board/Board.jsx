import React, { useState, useEffect ,useContext} from "react";
import styles from "./Board.module.css";
import Displaytodo from "../Displaytodo/Displaytodo";
import {
  deleteTask,
  getTodos,
  updateTaskStatus,
} from "../../services/Userlogin";
import AddTask from "../Addtask/AddTask";
import { contextUser } from "../../context/UserContext";

export default function Board() {
  const [currentDate, setCurrentDate] = useState("");
  const [todoModal, setTodoModal] = useState(false);
  const {tasks, setTasks} = useContext(contextUser)

  // set Date
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
  
  const collapseAllCard = () => {
    //not working todo
    setShowChecklist(false);
  };

  function showTodoModal() {
    setTodoModal(true);
  }

  async function handleDeleteTask (id){
    await deleteTask (id)
    setTasks ((prevTasks)=> prevTasks.filter ((task) => task._id !== id));
  }

  function handleTaskAdd(newTask) {
    setTasks((prevTask) => [...prevTask, newTask]);
  }

  return (
    <div>
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
                    onDeleteTask = {handleDeleteTask}

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
                      onDeleteTask = {handleDeleteTask}
                     
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
                    onDeleteTask = {handleDeleteTask}

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
                    onDeleteTask = {handleDeleteTask}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {todoModal ? (
        <AddTask
          onClose={() => setTodoModal(false)}
          onTaskAdd={handleTaskAdd}
        />
      ) : null}
    </div>
  );
}
