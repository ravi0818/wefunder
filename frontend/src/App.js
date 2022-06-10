import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

import UseNav from "./components/UseNav";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Company from "./pages/Company";
import UpdateCompany from "./pages/UpdateCompany";

const App = () => {
  return (
    <MyContext>
      <Router>
        <div className="App fulid-container bg-dark">
          <UseNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/company/:id" element={<Company />} />
            <Route path="/update" element={<UpdateCompany />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </MyContext>
  );
};

export default App;
