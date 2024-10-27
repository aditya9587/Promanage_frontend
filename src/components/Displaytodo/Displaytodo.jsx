import React, { useState, useContext, useRef } from "react";
import style from "./Displaytodo.module.css";

export default function Displaytodo({ onStatusChange, tasks , onDeleteTask }) {
  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [checklistVisibility, setChecklistVisibility] = useState({});

  const toggleChecklistVisibility = (todoId) => {
    setChecklistVisibility((prevState) => ({
      ...prevState,
      [todoId]: !prevState[todoId], // Toggle visibility for the specific todo
    }));
    console.log(tasks);
  };

  function closeModal(e) {
    if (dropdownRef.target === e.target) {
      setDropdown(false);
    }
  }
  const showDropdown = () => {
    setDropdown((prev) => !prev); // Toggle dropdown state
  };

  async function handleDeleteClick (id){
    await onDeleteTask(id);
    setDropdown(false)
  }
  return (
    <div className={style.container}>
      <div className={style.serprate}>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((item) => (
            <div key={item._id} className={style.mapDiv}>
              <div className={style.header}>
                <p className={style.priotymsg}>{item.priority} </p>
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
                    <button className={style.dropdownbtn3} onClick={()=> handleDeleteClick(item._id)}>DELETE</button>
                  </div>
                ) : null}
              </div>

              <h3 className={style.todoTitle}>{item.title}</h3>

              <div className={style.checkDiv}>
                <div className={style.insideCheckDiv}>
                  <p className={style.checkHeading}>
                    Checklist (
                    {item.checklist.filter((check) => check.checked).length}/
                    {item.checklist.length})
                  </p>
                  <img
                    src={
                      checklistVisibility[item._id]
                        ? "/images/Arrow.png"
                        : "/images/Arrow_Down.png"
                    }
                    alt="toggle arrow"
                    onClick={() => toggleChecklistVisibility(item._id)}
                  />
                </div>

                <div className={style.checklistItems}>
                  {checklistVisibility[item._id]
                    ? item.checklist.map((checkItem) => (
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
                <span className={style.dueDate} key={item._id}>
                  {item.dueDate
                    ? new Date(item.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : null}{" "}
                </span>
                {item.status !== "backlog" && (
                  <button onClick={() => onStatusChange(item._id, "backlog")}>
                    Backlog
                  </button>
                )}

                {item.status !== "todo" && (
                  <button onClick={() => onStatusChange(item._id, "todo")}>
                    To do
                  </button>
                )}

                {item.status !== "inProgress" && (
                  <button
                    onClick={() => onStatusChange(item._id, "inProgress")}
                  >
                    Progress
                  </button>
                )}

                {item.status !== "done" && (
                  <button onClick={() => onStatusChange(item._id, "done")}>
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
