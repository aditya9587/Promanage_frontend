import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import styles from "./Register.module.css";
import { userCreate, userLogin } from "../../services/Userlogin";
import { useNavigate } from "react-router-dom";
import { contextUser } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const navigate = useNavigate();
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [value, setValue] = useState(true);
  const [loginPassVisible, setLoginPassVisible] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
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

  const [loginError, setLoginError] = useState({
    email:false,
    password:false,
  })
    
    const loginErrorMsg ={
      email:{
        message:"Email is required and must contain @ and be longer than 3 characters",
        isValid : login.email.includes("@") && login.email.length > 3,
        onError : () => {
          setLoginError((loginError) => ({...loginError, email:true}))
        }
      },
      password :{
        message:"passord must have at least 8 letters",
        isValid : login.password.length >=  8,
        onError : () => {
          setLoginError((loginError)=> ({ ...loginError, password:true}))
        }
      },
    }

  const errorMessages = {
    name: {
      message: "Name is required",
      isValid: signup.name.length > 1,
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
      message: "Password length must at least 8",
      isValid: signup.password.length > 8,
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

  const validateLogin = () => {
    let isError = false;

    Object.keys(loginErrorMsg).forEach((key) => {
      if(!loginErrorMsg[key].isValid){
        isError = true ;
        loginErrorMsg[key].onError();
      }
    })
    return !isError;
  }

  const handlechange1 = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setLoginError((loginError) => ({...loginError , [e.target.name]:false}))
  };

  const handlechange2 = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
    setError((errors) => ({ ...errors, [e.target.name]: false }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      if(validateLogin()){
      const response = await userLogin(login);
      if (response.status === 200) {
        const token = response.data.Token;
        console.log(response)
        const userPayloadData = jwtDecode(token)
        localStorage.setItem("token", token);
        localStorage.setItem("name", userPayloadData.name)
        localStorage.setItem("email", userPayloadData.email)
        toast.success("login successfully");
        navigate("/dashboard");
      }
    }
    } catch (error) {
      toast.error("Invalid Email or password");
    }
    // else{
    //   toast.error("Invalid login details");
    // }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (validateSignup()) {
      try {
        const response = await userCreate(signup);
        console.log(response);
        if (response.status === 201) {
          toast.success("Registered successfully");
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
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={login.email}
                  onChange={handlechange1}
                  // required
                />
              </div>
              {loginError.email && (
                <p className={styles.displayLoginError}>{loginErrorMsg.email.message}</p> )}

              <div className={styles.inputBorder}>
                <img src="/images/lock.png" alt="" />
                <input
                  type={loginPassVisible ? "text" :"password"}
                  name="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={handlechange1}
                  // required
                />
                <img src={loginPassVisible ? "/images/view.png" : "/images/viewoff.png"} alt="" className={styles.passwordview} onClick={toggleLoginPassword}/>
              </div>
              {loginError.password && (
                <p className={styles.displayLoginError}>{loginErrorMsg.password.message}</p> )}
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
                <p className={styles.displayError}>{errorMessages.name.message}</p>
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

              {errors.email && <p className={styles.displayError}>{errorMessages.email.message}</p>}
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

              {errors.password && <p className={styles.displayError}>{errorMessages.password.message}</p>}
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
                <p className={styles.displayError}>{errorMessages.confirmPassword.message}</p>
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
