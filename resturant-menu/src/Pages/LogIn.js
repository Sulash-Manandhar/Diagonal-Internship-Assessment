import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheet/index.css";
import axios from "axios";

export const LogIn = () => {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const handleLogIn = () => {
    axios
      .post("http://localhost:4600/users/login-user", {
        email: document.getElementById("email-address").value,
        password: document.getElementById("password").value,
      })
      .then((res) => {
        console.log(res.data.user);
        if (sessionStorage.getItem("User")) {
          sessionStorage.removeItem("User");
        }
        sessionStorage.setItem("User", JSON.stringify(res.data.user));
        window.alert("You are now logged in.");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.msg) {
          setErrors(err.response.data.msg);
        }
      });
  };
  return (
    <div className="bg-white">
      <div className="mx-auto login-container shadow-lg p-3 mb-5 bg-body rounded">
        <div className="text-center">
          <h3>Log In</h3>
        </div>
        <form className="container mt-5 ">
          {errors !== "" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              {errors}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="email-address" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className="form-control"
              id="email-address"
              placeholder="example@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleLogIn();
              }}
            >
              Log in
            </button>
          </div>
          <div className="mt-3 text-center">
            No Account ? <NavLink to="/user-register">Register Now</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
