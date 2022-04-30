import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import "../stylesheet/index.css";

export const MenuList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let cartArray = [];

  //@desc fetch food data using axios
  useEffect(() => {
    axios
      .get("http://localhost:4600/food/")
      .then((res) => {
        //@desc add fetched data to the state
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  //@desc handle add to cart
  const handleAddToCart = (id, name, price) => {
    //@desc get the quantity of the item
    const quantity = document.getElementById(`quantity${id}`).value;

    //@desc get existing cart value
    if (localStorage.getItem("Cart")) {
      cartArray = JSON.parse(localStorage.getItem("Cart"));
      console.log("cartArray", cartArray);
    } else {
      cartArray = [];
    }
    let success = false; //boolean value for existing value

    //@condition find if existing item is available
    //@true update the quantity value
    //@false add data to the local storage

    //@true
    cartArray.map((item) => {
      if (item.id === id) {
        item.quantity = parseInt(item.quantity) + parseInt(quantity);
        return (success = true);
      }
    });

    //@false
    if (!success) {
      cartArray.push({
        id,
        name,
        price,
        quantity: quantity,
      });
    }
    //@desc update cart data
    if (cartArray.length) {
      localStorage.setItem("Cart", JSON.stringify(cartArray));
    }
    //@desc create event of local storage
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <div>
        <h3>Menu</h3>
      </div>

      {/* @desc mapping through the data  */}
      {data.map((item, index) => (
        <div className="list-group mb-3 " key={index}>
          <div className="list-group-item list-group-item-action d-flex gap-3 py-3 mb-2">
            <img
              src={item.image}
              alt={item.name}
              width="100"
              height="100"
              className="rounded-circle flex-shrink-0"
            />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h5 className="mb-1">{item.name}</h5>
                <p className="mb-0 ">Price: {item.price}</p>
                <div className="col-md-5 mt-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id={`quantity${item._id}`}
                    min="1"
                    defaultValue={1}
                    placeholder="Quantity..."
                  />
                </div>
              </div>

              <small className="text-nowrap">
                <button
                  className="btn btn-success btn-sm"
                  //@condition check if user is logged in?
                  //@true call handleAddToCart function
                  //@false alert message to user
                  onClick={(e) => {
                    e.preventDefault();
                    if (!sessionStorage.getItem("User")) {
                      let confirmation = window.confirm(
                        "You need to be sign in to use this function. Do you want to log in now?"
                      );
                      if (confirmation) {
                        navigate("/user-login");
                      }
                    } else {
                      handleAddToCart(item._id, item.name, item.price);
                    }
                  }}
                >
                  Add
                  <IoMdAddCircle className="mb-1 ms-1" />
                </button>
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
