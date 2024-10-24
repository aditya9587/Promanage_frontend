import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserContext from "./context/UserContext";
import AddTask from "./components/Addtask/AddTask";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<AddTask/>} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
