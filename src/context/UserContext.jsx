import React from "react";
import { createContext, useState } from "react";

export const contextUser = createContext(null);

export default function UserContext({ children }) {
  const [userName, setUserName] = useState("Aditya");

  const [selectedDate, setSelectedDate] = useState(null);

  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div>
      <contextUser.Provider value={{ userName, setUserName ,signup ,setsignup,selectedDate, setSelectedDate}}>
        {children}
      </contextUser.Provider>
    </div>
  );
}
