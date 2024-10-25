import React from "react";
import { createContext, useState } from "react";

export const contextUser = createContext(null);

export default function UserContext({ children }) {

  // const [todo, setTodo] = useState([]);

  return (
    <div>
      <contextUser.Provider >
        {children}
      </contextUser.Provider>
    </div>
  );
}
