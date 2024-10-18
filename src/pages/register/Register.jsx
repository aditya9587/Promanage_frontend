import React, { useState } from "react";
import styles from "./Register.module.css";
import { userCreate, userLogin } from "../../services/Userlogin";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [value, setValue] = useState(true);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const errorMessages = {
    name: {
      message: "Name is required",
      isValid: signup.name.length > 0,
      onError: () => {
        setError((error) => ({ ...error, name: true }));
      },
    },
    email: {
      message: "Email is required",
      isValid: signup.email.length > 0,
      onError: () => {
        setError((error) => ({ ...error, email: true }));
      },
    },
    password: {
      message: "Password is required",
      isValid: signup.password.length > 0,
      onError: () => {
        setError((error) => ({ ...error, password: true }));
      },
    },
    confirmPassword: {
      message: "Passwords do not match",
      isValid: signup.confirmPassword === signup.password,
      onError: () => {
        setError((error) => ({ ...error, confirmPassword: true }));
      },
    },
  };

  const validateSignup = () => {
    let isError = false;

    Object.keys(errorMessages).forEach((key) => {
      if (!errorMessages[key].isValid) {
        isError = true;
        errorMessages[key].onError();
      }
    });
    return !isError;
  };

  const handlechange1 = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handlechange2 = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
    setError((errors) => ({ ...errors, [e.target.name]: false }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    const response = await userLogin(login);
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (validateSignup()) {
      const response = await userCreate(signup);
      if (response.status === 201) {
        alert("Registered successfully");
        navigate("/dashboard");
      }
      const token = response.data.Token;
      localStorage.setItem("token", token);
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className={styles.container}>
      {value ? (
        <>
          <div className={styles.logo}>
            <img src="/images/Group.png" alt="logo" />
            <h2>Welcome aboard my friend</h2>
            <p>just a couple of clicks and we start</p>
          </div>
          <div className={styles.login}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={login.email}
                onChange={handlechange1}
                className={styles.emailIcon}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={login.password}
                onChange={handlechange1}
                className={styles.passwordLock}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p>Have no account yet?</p>
            <button
              className={styles.redirectbtn}
              onClick={() => {
                setValue(false);
              }}
            >
              Register
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.logo}>
            <img src="/images/Group.png" alt="logo" />
            <h2>Welcome aboard my friend</h2>
            <p>just a couple of clicks and we start</p>
          </div>
          <div className={styles.login}>
            <h2>Register</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signup.name}
                onChange={handlechange2}
                className={styles.userIcon}
              />
                {errors.name && <p className={styles.errmsg}>{errorMessages.name.message}</p>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signup.email}
                onChange={handlechange2}
                className={styles.emailIcon}
              />
              {errors.email && <p>{errorMessages.email.message}</p>}
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={signup.password}
                onChange={handlechange2}
                className={styles.passwordLock}
              />
              {errors.password && <p>{errorMessages.password.message}</p>}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signup.confirmPassword}
                onChange={handlechange2}
                className={styles.passwordLock}
              />
              {errors.confirmPassword && <p>{errorMessages.confirmPassword.message}</p>}
              <button type="submit">Register</button>
            </form>
            <p>Have an account ?</p>
            <button
              onClick={() => {
                setValue(true);
              }}
              className={styles.redirectbtn}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
