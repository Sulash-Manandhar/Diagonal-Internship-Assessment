import React from "react";
import { NavLink } from "react-router-dom";
import "../stylesheet/index.css";

export const Header = () => {
  return (
    <nav className="navbar bg-grey py-3 mb-4 border-bottom">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <NavLink to="/" className="nav-link">
            Resturant XYZ
          </NavLink>
        </span>
      </div>
    </nav>
  );
};
