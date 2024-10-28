import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import styles from "./Register.module.css";
import { userCreate, userLogin } from "../../services/Userlogin";
import { useNavigate } from "react-router-dom";
import { contextUser } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const navigate = useNavigate();
  const {signup, setsignup} = useContext(contextUser)

  const [value, setValue] = useState(true);
  const [loginPassVisible, setLoginPassVisible] = useState(true)
  const [passwordVisible, setPasswordVisible] = useState({
    password: true,
    confirmPassword: true,
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
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
  function toggleLoginPassword(){
    setLoginPassVisible(!loginPassVisible)
  }
  function togglePasswordVisible(field) {
    setPasswordVisible((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  }
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
    try {
      const response = await userLogin(login);
      if (response.status === 200) {
        const token = response.data.Token;
        console.log(response)
        const userPayloadData = jwtDecode(token)
        localStorage.setItem("token", token);
        localStorage.setItem("name", userPayloadData.name)
        localStorage.setItem("email", userPayloadData.email)
        toast("login successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid Email or password");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (validateSignup()) {
      try {
        const response = await userCreate(signup);
        console.log(response);
        if (response.status === 201) {
          toast("Registered successfully");
          setValue(true);

          setsignup({ name: "", email: "", password: "", confirmPassword: "" });
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Invalid Signup details");
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
            <form onSubmit={handleLogin} className={styles.submitForm}>
              <div className={styles.inputBorder}>
                <img src="/images/icon.png" alt="" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={login.email}
                  onChange={handlechange1}
                  required
                />
              </div>

              <div className={styles.inputBorder}>
                <img src="/images/lock.png" alt="" />
                <input
                  type={loginPassVisible ? "text" :"password"}
                  name="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={handlechange1}
                  required
                />
                <img src={loginPassVisible ? "/images/view.png" : "/images/viewoff.png"} alt="" className={styles.passwordview} onClick={toggleLoginPassword}/>
              </div>

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
            <form onSubmit={handleSignup} className={styles.submitForm}>
              <div className={styles.inputBorder}>
                <img src="/images/icon.png" alt="" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={signup.name}
                  onChange={handlechange2}
                />
              </div>

              {errors.name && (
                <p className={styles.errmsg}>{errorMessages.name.message}</p>
              )}
              <div className={styles.inputBorder}>
                <img src="/images/Profile.png" alt="" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signup.email}
                  onChange={handlechange2}
                />
              </div>

              {errors.email && <p>{errorMessages.email.message}</p>}
              <div className={styles.inputBorder}>
                <img src="/images/lock.png" alt="" />
                <input
                  type={passwordVisible.password ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={signup.password}
                  onChange={handlechange2}
                />
                <img
                  src={
                    passwordVisible.password
                      ? "/images/view.png"
                      : "/images/viewoff.png"
                  }
                  alt=""
                  className={styles.passwordview}
                  onClick={() => togglePasswordVisible("password")}
                />
              </div>

              {errors.password && <p>{errorMessages.password.message}</p>}
              <div className={styles.inputBorder}>
                <img src="/images/lock.png" alt="" />
                <input
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signup.confirmPassword}
                  onChange={handlechange2}
                />
                <img
                  src={
                    passwordVisible.confirmPassword
                      ? "/images/view.png"
                      : "/images/viewoff.png"
                  }
                  alt=""
                  className={styles.passwordview}
                  onClick={() => togglePasswordVisible("confirmPassword")}
                />
              </div>

              {errors.confirmPassword && (
                <p>{errorMessages.confirmPassword.message}</p>
              )}
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
