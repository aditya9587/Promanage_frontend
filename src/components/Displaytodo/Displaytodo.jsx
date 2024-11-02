import React, { useState, useContext, useRef, useEffect } from "react";
import style from "./Displaytodo.module.css";
import { getUserById } from "../../services/Userlogin";

export default function Displaytodo({ onStatusChange, tasks, onDeleteTask }) {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [checklistVisibility, setChecklistVisibility] = useState({
    todo: false,
    backlog: false,
    inProgress: false,
    done: false,
  });
  const [userNames, setUserNames] = useState({});

  const toggleChecklistVisibility = (todoId) => {
    setChecklistVisibility((prevState) => ({
      ...prevState,
      [todoId]: !prevState[todoId], 
    }));
  };

  function closeModal(e) {
    if (dropdownRef.target === e.target) {
      setDropdown(false);
    }
  }
  const showDropdown = () => {
    setDropdown((prev) => !prev); 
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

  const getInitials = (name) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };



  useEffect(() => {
    const fetchUserNames = async () => {
      const userMap = {};
      try {
        await Promise.all(
          tasks.map(async (task) => {
            if (task.assignTo) { 
              const response = await getUserById(task.assignTo); 
              const userName = response.data && response.data.user ? response.data.user.name : null; 
              if (userName) {
                userMap[task._id] = userName; 
              } else {
                console.error(`User not found for task ID: ${task._id}`);
              }
            }
          })
        );
        setUserNames(userMap); 
      } catch (error) {
        console.error("Error fetching user names:", error); 
      }
    };
  
    if (tasks.length > 0) {
      fetchUserNames();
    }
  }, [tasks]);

  return (
    <div className={style.container}>
      <div className={style.serprate}>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={style.mapDiv}>
              <div className={style.header}>
                <p className={style.priotymsg}>
                  {task.priority}{" "}
                  {task.assignTo && userNames[task._id] && (
                    <span className={style.initials}>
                      {getInitials(userNames[task._id])}
                    </span>
                  )}
                </p>
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
