import React from "react";
import { createContext, useState } from "react";

export const contextUser = createContext(null);

export default function UserContext({ children }) {

  const [activeComponent, setActiveComponent] = useState("Board");
  

  return (
    <div>
      <contextUser.Provider  value = {{activeComponent, setActiveComponent}}>
        {children}
      </contextUser.Provider>
    </div>
  );
}
