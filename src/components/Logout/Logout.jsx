import React, {useRef} from "react";
import style from "./Logout.module.css";

export default function Logout({onClose}) {
  const modalRef = useRef()

  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }
  const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    window.location.href = '/';
  }

  return (
    <div className={style.Container}  ref={modalRef} onClick={closeModal} >
      <div className={style.insideLogout}>
      <h3 className={style.logoutHeading}>Are you sure you want to Logout?</h3>
      <button  onClick={removeToken} className={style.logoutBtn}>Yes, Logout</button>
      <button className={style.cancelBtn} onClick={onClose}>Cancel</button>
      </div>  
    </div>
  );
}
