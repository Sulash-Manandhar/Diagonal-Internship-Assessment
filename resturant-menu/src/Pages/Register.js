import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [errors, setErrors] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4600/users/register-user", {
        fname: document.getElementById("first-name").value,
        lname: document.getElementById("last-name").value,
        email: document.getElementById("email-address").value,
        password1: document.getElementById("password1").value,
        password2: document.getElementById("password2").value,
      })
      .then((res) => {
        console.log(res.data);
        window.alert("You can login now");
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ msg: "Email Already registered" });
        }
      });
  };
  return (
    <div className="bg-white">
      <div className="login-container shadow-lg p-3 mb-5 bg-body rounded mx-auto">
        <div className="text-center">
          <h3>Register</h3>
        </div>
        {errors.length ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {errors.map((item, index) => (
              <p key={index}>{item.msg}</p>
            ))}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="first-name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              placeholder="Example"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last-name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              placeholder="Example"
            />
          </div>
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
              id="password1"
              placeholder="********"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="********"
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div className="mt-3 text-center">
            Have a account ? <NavLink to="/user-login">Log In</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
