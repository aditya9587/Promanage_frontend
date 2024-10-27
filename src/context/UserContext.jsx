import React from "react";
import { createContext, useState } from "react";

export const contextUser = createContext(null);

export default function UserContext({ children }) {

  const [activeComponent, setActiveComponent] = useState("Board");

  const [tasks, setTasks] = useState([]);

  

  return (
    <div>
      <contextUser.Provider  value = {{activeComponent, setActiveComponent, tasks, setTasks}}>
        {children}
      </contextUser.Provider>
    </div>
  );
}
