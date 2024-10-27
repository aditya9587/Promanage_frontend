import axios, { isAxiosError } from "axios";

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
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
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
  const token = localStorage.getItem("token");
  const res = axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res;
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
    console.log("Task status successfully updated");
  } catch (error) {
    console.error("Error updating task status in the backend:", error);
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
    console.log("Task Sucessfully deleted");
  } catch (error) {
    // console.log("error deleting the task in the backend", error);
    if(isAxiosError){
      console.log(isAxiosError)
    }
  }
};
