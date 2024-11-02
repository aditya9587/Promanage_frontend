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

export const userLogin = (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/login`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `${token}`,
      },
    });
    return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
};

export const todoCreate = (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/todo`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
};

export const getTodos = () => {
  try {
    const token = localStorage.getItem("token");
  const res = axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
  
};

export const updateTaskStatus = async (mainID, newStatus) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/${mainID}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
};

export const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/deleteTask/${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  } catch (error) {
   return res.status(400).json({ message: "api call error" });
  }
};

export const editTask = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/editTask/${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
};


export const updateUser = (data) =>{
  try {
    const token = localStorage.getItem("token")
    const res = axios.put(`${import.meta.env.VITE_BASE_URL}/updateUser`,data,{
      headers:{
         Authorization : `${token}`
      },
    })
    return res;
  } catch (error) {
    return res.status(400).json({ message: "api call error" });
  }
}

export const getallUser = () =>{
  try {
    const token = localStorage.getItem("token")
    const res = axios.get(`${import.meta.env.VITE_BASE_URL}/getallUser`,{
      headers:{
        Authorization : `${token}`
      },
    })
    return res;
  } catch (error) {
   return res.status(400).json({ message: "api call error" });
  }
}

export const getUserById = (id) =>{
  try {
    const token = localStorage.getItem("token")
    const res = axios.get(`${import.meta.env.VITE_BASE_URL}/getuser/${id}`,{
      headers:{
        Authorization : `${token}`
      },
    })
    return res;
  } catch (error) {
   return res.status(400).json({ message: "api call error" });
  }
}