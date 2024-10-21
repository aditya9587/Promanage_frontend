import axios from "axios";

export const userCreate = (data) => {
  try {
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/register`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
};

export const userLogin = (data) =>{
  try {

    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/login`,data,{
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      },
    })
    console.log(res)
    return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
}

export const todoCreate = (data) => {
  try {
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/todo`,data,{
      headers:{
        'Content-Type': 'application/json'
      },
    })
    return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
} 