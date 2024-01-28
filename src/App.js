import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthContextProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
