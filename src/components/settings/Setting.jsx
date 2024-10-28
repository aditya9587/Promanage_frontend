import React, { useContext, useEffect, useState } from "react";
import style from "./Setting.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { contextUser } from "../../context/UserContext";
import { updateUser } from "../../services/Userlogin";
import { useNavigate } from "react-router-dom";

function Setting() {
  const { signup, setSignup } = useContext(contextUser);

  const navigate = useNavigate();

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: true,
    newPassword: true,
  });

  const [updateUserDetails, setUpdateUser] = useState({
    name: "",
    email: "",
    oldpassword: "",
    newpassword: "",
  });

  useEffect(() => {
    setUpdateUser((prevState) => ({
      ...prevState,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    }));
  }, []);

  // Validation function
  const validateInputs = () => {
    const { name, email, oldpassword, newpassword } = updateUserDetails;

    if (!name) {
      toast.error("Name is required!");
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!oldpassword || oldpassword.length < 8) {
      toast.error("Old Password is must be at least 8 character");
      return false;
    }
    if (!newpassword || newpassword.length < 8) {
      toast.error("New Password must be at least 8 characters!");
      return false;
    }

    if (oldpassword == newpassword) {
      toast.error("Both the password not to be same");
      return false;
    }

    return true; // All validations passed
  };

  function togglePasswordVisible(field) {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (validateInputs()) {
        const response = await updateUser(updateUserDetails);
        if (response && response.status == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          navigate("/");
          toast.success("Updated Successfully!");
        }
      }
    } catch (error) {
      toast.error("Updation failed");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  return (
    <div className={style.container}>
      <h3>Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={style.inputDiv}>
          <img src="/images/Profile.png" alt="" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={updateUserDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className={style.inputDiv}>
          <img src="/images/icon.png" alt="" />
          <input
            type="email"
            name="email"
            placeholder="Update Email"
            value={updateUserDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className={style.inputDiv}>
          <img src="/images/lock.png" alt="" />
          <input
            type={passwordVisibility.oldPassword ? "text" : "password"}
            name="oldpassword"
            placeholder="Old Password"
            value={updateUserDetails.oldpassword}
            onChange={handleChange}
          />

          <img
            src={
              passwordVisibility.oldPassword
                ? "/images/view.png"
                : "/images/viewoff.png"
            }
            alt=""
            onClick={() => togglePasswordVisible("oldPassword")}
            className={style.passwordicon}
          />
        </div>
        <div className={style.inputDiv}>
          <img src="/images/lock.png" alt="" />
          <input
            type={passwordVisibility.newPassword ? "text" : "password"}
            placeholder="new Password"
            name="newpassword"
            onChange={handleChange}
            value={updateUserDetails.newpassword}
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

export default Setting;
