import React, { useState, useContext, useRef } from "react";
import style from "./Displaytodo.module.css";

export default function Displaytodo({ onStatusChange, tasks, onDeleteTask }) {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [checklistVisibility, setChecklistVisibility] = useState({
    todo: false,
    backlog: false,
    inProgress: false,
    done: false,
  });

  const toggleChecklistVisibility = (todoId) => {
    setChecklistVisibility((prevState) => ({
      ...prevState,
      [todoId]: !prevState[todoId], // Toggle visibility for the specific todo
    }));
  };

  function closeModal(e) {
    if (dropdownRef.target === e.target) {
      setDropdown(false);
    }
  }
  const showDropdown = () => {
    setDropdown((prev) => !prev); // Toggle dropdown state
  };

  async function handleDeleteClick(id) {
    await onDeleteTask(id);
    setDropdown(false);
  }

  const getDueDateClass = (priority, status, dueDate) => {
    const isOverdue = dueDate && new Date(dueDate) < new Date();
    if (status === "done") return style.done;
    if (isOverdue) return style.overdue;

    switch (priority) {
      case "HIGH PRIORITY":
        return style.highPriority;
      case "MODERATE PRIORITY":
        return style.moderatePriority;
      case "LOW PRIORITY":
        return style.lowPriority;
      default:
        return "";
    }
  };

  return (
    <div className={style.container}>
      <div className={style.serprate}>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={style.mapDiv}>
              <div className={style.header}>
                <p className={style.priotymsg}>{task.priority} </p>
                <img
                  src="/images/option.png"
                  alt=""
                  className={style.editIcon}
                  onClick={showDropdown}
                />
                {dropdown ? (
                  <div
                    className={style.dropdown}
                    ref={dropdownRef}
                    onClick={closeModal}
                  >
                    <button>EDIT</button>
                    <button>SHARE</button>
                    <button
                      className={style.dropdownbtn3}
                      onClick={() => handleDeleteClick(task._id)}
                    >
                      DELETE
                    </button>
                  </div>
                ) : null}
              </div>

              <h3 className={style.todoTitle}>{task.title}</h3>

              <div className={style.checkDiv}>
                <div className={style.insideCheckDiv}>
                  <p className={style.checkHeading}>
                    Checklist (
                    {task.checklist.filter((check) => check.checked).length}/
                    {task.checklist.length})
                  </p>
                  <img
                    src={
                      checklistVisibility[task._id]
                        ? "/images/Arrow.png"
                        : "/images/Arrow_Down.png"
                    }
                    alt="toggle arrow"
                    onClick={() => toggleChecklistVisibility(task._id)}
                  />
                </div>

                <div className={style.checklistItems}>
                  {checklistVisibility[task._id]
                    ? task.checklist.map((checkItem) => (
                        <div
                          key={checkItem._id}
                          className={style.checklistItem}
                        >
                          <input
                            type="checkbox"
                            checked={checkItem.checked}
                            className={style.checkbox}
                          />
                          <span>{checkItem.text}</span>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <div className={style.fotterDiv}>
                <span
                  className={` ${style.dueDate} ${getDueDateClass(
                    task.priority,
                    task.status,
                    task.dueDate
                  )}`}
                  key={task._id}
                >
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : null}{" "}
                </span>
                {task.status !== "backlog" && (
                  <button onClick={() => onStatusChange(task._id, "backlog")}>
                    Backlog
                  </button>
                )}

                {task.status !== "todo" && (
                  <button onClick={() => onStatusChange(task._id, "todo")}>
                    To do
                  </button>
                )}

                {task.status !== "inProgress" && (
                  <button
                    onClick={() => onStatusChange(task._id, "inProgress")}
                  >
                    Progress
                  </button>
                )}

                {task.status !== "done" && (
                  <button onClick={() => onStatusChange(task._id, "done")}>
                    Done
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No todos available</p>
          </div>
        )}
      </div>
    </div>
  );
}
