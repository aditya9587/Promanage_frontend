import React from "react";
import style from "./AddEmail.module.css";

export default function AddEmail({ontap}) {
  return (
    <div className={style.AddEmailContainer}>
      <form className={style.formSubmit}>
        <h3>Add people to the board </h3>
        <input type="text" placeholder="Enter the Email" />
        <div className={style.btnDiv}>
          <button className={style.cancelbtn} onClick={ontap}>Cancel</button>
          <button className={style.addbtn}>Add Email</button>
        </div>
      </form>
    </div>
  );
}
