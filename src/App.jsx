import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Deletepopup from "./components/deletepopup/Deletepopup";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Deletepopup /> } />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
