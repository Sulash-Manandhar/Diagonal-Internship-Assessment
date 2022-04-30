import React from "react";
import "../stylesheet/index.css";
import { useNavigate } from "react-router-dom";

//react-icons
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";

export const Navbar = ({ handlePageChange, page }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="list-group pointer">
        {/* Menu  */}
        <li
          className={
            page === "MenuList"
              ? "list-group-item active-link "
              : "list-group-item"
          }
          aria-current="true"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("MenuList");
          }}
        >
          <AiOutlineMenuFold className="me-3" /> Menu List
        </li>

        {/* Order History */}
        <li
          className={
            page === "OrderHistory"
              ? "list-group-item active-link"
              : "list-group-item"
          }
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("OrderHistory");
          }}
        >
          <MdHistory className="me-3" />
          Order History
        </li>
        {!sessionStorage.getItem("User") ? (
          <li
            className="list-group-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/user-register");
            }}
          >
            <AiOutlineUserAdd className="me-3" />
            Sing Up
          </li>
        ) : null}

        {/* LogOut  */}
        {sessionStorage.getItem("User") ? (
          <li
            className="list-group-item"
            onClick={(e) => {
              e.preventDefault();
              sessionStorage.removeItem("User");
              localStorage.removeItem("Cart");
              navigate("user-login");
            }}
          >
            <BiLogOut className="me-3" />
            Log Out
          </li>
        ) : (
          <li
            className="list-group-item"
            onClick={(e) => {
              e.preventDefault();
              navigate("/user-login");
            }}
          >
            <BiLogOut className="me-3" />
            Log In
          </li>
        )}
      </ul>
    </div>
  );
};
