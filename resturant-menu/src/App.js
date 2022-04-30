import React from "react";

//components

import { Header } from "./Components/Header";
import Home from "./Pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";

export const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/user-login" element={<LogIn />} />
          <Route path="/user-register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
