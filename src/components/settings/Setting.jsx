import React, { useState } from "react";
import style from "./Setting.module.css";

 function Setting() {
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: true,
    newPassword: true,
  });

  function togglePasswordVisible(field) {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  }

  return (
    <div className={style.container}>
      <h3>Settings</h3>
      <form>
        <div className={style.inputDiv}>
          <img src="/images/Profile.png" alt="" />
          <input type="text" placeholder="Name" />
        </div>
        <div className={style.inputDiv}>
          <img src="/images/icon.png" alt="" />
          <input type="text" placeholder="Update Email" />
        </div>
        <div className={style.inputDiv}>
          <img src="/images/lock.png" alt="" />
          <input
            type={passwordVisibility.oldPassword ? "text" : "password"}
            placeholder="Old Password"
          />

          <img
            src={
              passwordVisibility.oldPassword
                ? "/images/view.png"
                : "/images/viewoff.png"
            }
            alt=""
            onClick={()=>togglePasswordVisible("oldPassword")}
            className={style.passwordicon}
          />
        </div>
        <div className={style.inputDiv}>
          <img src="/images/lock.png" alt="" />
          <input
            type={passwordVisibility.newPassword ? "text" : "password"}
            placeholder="new Password"
          />
          <img
            src={
              passwordVisibility.newPassword
                ? "/images/view.png"
                : "/images/viewoff.png"
            }
            alt=""
            onClick={() => togglePasswordVisible("newPassword")}
            className={style.passwordicon}
          />
        </div>
        <button className={style.submitbtn}>Update</button>
      </form>
    </div>
  );
}

export default Setting
