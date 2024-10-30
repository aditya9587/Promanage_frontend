import React from "react";
import { createContext } from "react";

export const contextUser = createContext(null);

export default function UserContext({ children }) {
  return (
    <div>
      <contextUser.Provider>{children}</contextUser.Provider>
    </div>
  );
}
