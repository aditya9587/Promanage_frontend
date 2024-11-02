import React, { useState, useEffect } from "react";
import style from "./Analytics.module.css";
import { getTodos } from "../../services/Userlogin"; 

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    lowPriority: 0,
    midPriority: 0,
    highPriority: 0,
    dueDate: 0,
  });

  useEffect(() => {
    async function fetchTasks() {
      const response = await getTodos(); 
      setTasks(response.data.data); 
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    const calculateCounts = () => {
      const newCounts = {
        backlog: 0,
        todo: 0,
        inProgress: 0,
        done: 0,
        lowPriority: 0,
        midPriority: 0,
        highPriority: 0,
        dueDate: 0,
      };

      tasks.forEach((task) => {
        // Count by status
        if (task.status === "backlog") newCounts.backlog++;
        if (task.status === "todo") newCounts.todo++;
        if (task.status === "inProgress") newCounts.inProgress++;
        if (task.status === "done") newCounts.done++;

        // Count by priority
        if (task.priority === "LOW PRIORITY") newCounts.lowPriority++;
        if (task.priority === "MODERATE PRIORITY") newCounts.midPriority++;
        if (task.priority === "HIGH PRIORITY") newCounts.highPriority++;

        // Count tasks with due dates
        if (task.dueDate) newCounts.dueDate++;
      });

      setCounts(newCounts);
    };

    calculateCounts();
  }, [tasks]);

  return (
    <div className={style.container}>
      <h2>Analytics</h2>
      <div className={style.coverDiv}>
        <div className={style.taskDiv}>
          <ul>
            <li>Backlog Task <span>{counts.backlog}</span> </li>
            <li>To-do Task <span>{counts.todo}</span></li>
            <li>In-Progress Task <span>{counts.inProgress}</span></li>
            <li>Completed Tasks <span>{counts.done}</span></li>
          </ul>
        </div>
        <div className={style.taskDiv}>
          <ul>
            <li>Low Priority <span>{counts.lowPriority}</span></li>
            <li>Mid Priority <span>{counts.midPriority}</span></li>
            <li>High Priority <span>{counts.highPriority}</span></li>
            <li>Due Date Task <span>{counts.dueDate}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;