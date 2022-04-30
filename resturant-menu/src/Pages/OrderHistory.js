import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const OrderHistory = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`http://localhost:4600/order/${userId}`)
      .then((res) => {
        setData(res.data.order);
        console.log(res.data.order);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div>
      {sessionStorage.getItem("User") ? (
        <div>
          <h3>Your order</h3>
          {data.map((item, index) => (
            <div
              className="card text-dark bg-light mb-3 float-start me-3"
              style={{ width: "18rem" }}
              key={index}
            >
              <div className="card-header">Resturant XYZ</div>
              <div className="card-body">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">No of Quantity: {item.itemQuantity}</p>
                <p className="card-text">
                  Price (per item): Rs.{item.itemPrice}/-
                </p>
                <p className="card-text">
                  Total: {item.itemPrice * item.itemQuantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h5>
            You need to be login to use this functionality.
            <NavLink to="/user-login">Log In Now.</NavLink>
          </h5>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
