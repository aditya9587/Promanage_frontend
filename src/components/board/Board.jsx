import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
import Displaytodo from "../Displaytodo/Displaytodo";
import {
  deleteTask,
  getTodos,
  updateTaskStatus,
} from "../../services/Userlogin";
import AddTask from "../Addtask/AddTask";

export default function Board() {
  const [currentDate, setCurrentDate] = useState("");
  const [todoModal, setTodoModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState(false);
  const [filterTaskValue, setFilterTaskValue] = useState("ALL");

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
      const response = await getTodos(); // To fetch Task
      setTasks(response.data.data); //to set task
    }
    fetchTask();
  }, [setTasks]);

  const boardname = localStorage.getItem("name");

  // TO chnge the Status of the task
  async function handleStatusChange(mainID, newStatus) {
    const updatedTask = tasks.map((task) =>
      task._id === mainID ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTask);
    await updateTaskStatus(mainID, newStatus);
  }

  // to set the added task
  function handleTaskAdd(newTask) {
    setTasks((prevTask) => [...prevTask, newTask]);
  }

  // to delete the particular task
  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  }

  function filterTasksByDate() {
    const today = new Date();
    switch (filterTaskValue) {
      case "Today":
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate.toDateString() === today.toDateString();
        });
      case "This Week":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
      case "This Month":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= startOfMonth && taskDate <= endOfMonth;
        });

      case "All":
      default:
        return tasks;
    }
  }

  return (
    <div>
      <div className={styles.rightSide}>
        <div className={styles.mainDash}>
          <div className={styles.mainDash1}>
            <h3>Welcome! {boardname} </h3>
            <div>{currentDate}</div>
          </div>

          <div className={styles.mainDash2}>
            <div>
              <h2>Board</h2>
              {/* <p>add people</p> */}
            </div>

            <p onClick={() => setFilterTask(!filterTask)}>
              {filterTaskValue} <img src="/images/filterArrow.png" alt="" />
            </p>
            {filterTask ? (
              <div className={styles.filterTask}>
             {["Today", "This Week", "This Month", "All"].map((filter) => (
                  <p
                    key={filter}
                    onClick={() => {
                      setFilterTaskValue(filter);
                      setFilterTask(false);
                    }}
                  >
                    {filter}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.todoGroup}>
          {["backlog", "todo", "inProgress", "done"].map((status) => (
            <div key={status} className={styles.insideGroup}>
              <div className={styles.taskHeading}>
                <span>{status}</span>
                {status === "todo" ? (
                  <img
                    src="/images/add.png"
                    onClick={() => setTodoModal(!todoModal)}
                  />
                ) : null}
                <img src="/images/collapse.png" alt="" />
              </div>
              <div>
                {filterTasksByDate()
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Displaytodo
                      key={task._id}
                      tasks={[task]}
                      onStatusChange={handleStatusChange}
                      onDeleteTask={handleDeleteTask}
                    />
                  ))}
              </div>
            </div>
          ))}
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
