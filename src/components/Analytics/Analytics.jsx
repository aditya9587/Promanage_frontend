import React from "react";
import style from "./Analytics.module.css";

function Analytics() {
  return (
    <div className={style.container}>
      <h2>Analytics</h2>
      <div className={style.coverDiv}>
        <div className={style.taskDiv}>
          <ul>
            <li>Backlog Task <span>5</span> </li>
            <li>To-do Task <span>5</span></li>
            <li>In-Progress Task <span>5</span></li>
            <li>Compeleted Tasks <span>5</span></li>
          </ul>
        </div>
        <div className={style.taskDiv}>
          <ul>
            <li>Low Priority  <span>5</span></li>
            <li>Mid Priority <span>5</span></li>
            <li>High Priority <span>5</span></li>
            <li>Due Date Task <span>5</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
