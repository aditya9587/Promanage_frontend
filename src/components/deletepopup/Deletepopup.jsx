import React from "react";
import style from './Deletepopup.module.css'

export default function Deletepopup({toOpen, toClose}) {
  return (
    <div className={style.parentDeletePopup}>
      <div className={style.deleteTaskPopup}>
        <p>Are you sure you want to delete ?</p>
        <button onClick={() => handleDeleteClick(task._id)} className={style.deleteBtn}>Yes, Delete</button>
        <button className={style.cancelBtn} onClick={toClose} > Cancel</button>
      </div>
    </div>
  );
}
