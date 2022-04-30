import React, { useEffect, useState } from "react";
import axios from "axios";

export const Cart = ({ userId }) => {
  //defining useState
  const [cartItem, setCartItem] = useState([]);
  let temp = cartItem;
  const [totalAmount, setTotalAmount] = useState(0);

  //@desc load data when ui loads
  useEffect(() => {
    if (localStorage.getItem("Cart")) {
      setCartItem(JSON.parse(localStorage.getItem("Cart")));
    }
  }, [userId]);

  //@desc update state(cart data) when local storage updates
  window.addEventListener("storage", () => {
    let localData = JSON.parse(localStorage.getItem("Cart"));
    setCartItem(localData);
  });

  //@desc calculate totalAmount
  useEffect(() => {
    let tempAmount = 0;
    cartItem.map((item) => {
      tempAmount += item.price * item.quantity;
    });
    setTotalAmount(tempAmount);
  }, [cartItem]);

  //@desc remove item from the cart
  const handleRemoveFromCart = (index) => {
    temp = cartItem;
    temp.splice(index, 1);
    setCartItem(temp);
    localStorage.setItem("Cart", JSON.stringify(temp));
    //@desc create event of local storage
    window.dispatchEvent(new Event("storage"));
  };

  //@desc handle user checkout
  const handleCheckout = () => {
    if (userId !== undefined) {
      if (!cartItem.length) {
        window.alert("Cart is empty");
      } else {
        let success = 1;
        cartItem.map((item) => {
          axios
            .post("http://localhost:4600/order/add-order", {
              userId: userId,
              itemId: item.id,
              itemName: item.name,
              itemPrice: item.price,
              itemQuantity: item.quantity,
            })
            .then((res) => {
              if (success === cartItem.length) {
                localStorage.removeItem("Cart");
                setCartItem([]);
                temp = [];
              } else {
                console.log(success);
                success++;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });

        console.log("checked out");
      }
    } else {
      window.alert("you are not logged in");
    }
  };
  return (
    <div>
      <ul className="list-group pointer ">
        {/* Cart  */}
        <li
          className="list-group-item text-center fw-bold fs-5 "
          aria-current="true"
        >
          <span className="heading"> Cart Item</span>
        </li>

        {/* @condition check if cartItem has item or not  
            @true display item in list format 
            @false notify user about empty cart
        */}
        {cartItem.length ? (
          cartItem.map((item, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={index}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {index + 1}.{item.name}
                </div>
                <div> Price: {item.price}</div>
                <div> Quantity: {item.quantity}</div>
              </div>
              <div>
                <div className="text-end">{item.price * item.quantity}</div>

                <button
                  className="btn badge rounded-pill bg-danger"
                  //@desc call handleRemoveFromCart function
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromCart(index);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <li
            className="list-group-item text-center text-muted "
            aria-current="true"
          >
            No Item Available
          </li>
        )}
        <li className="list-group-item fw-bold " aria-current="true">
          <div className="d-flex justify-content-between">
            Total Amount
            <span>{totalAmount}</span>
          </div>
        </li>
        {/* @desc checkout button  */}
        <div className="d-grid gap-2 mt-2">
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
          >
            Checkout
          </button>
        </div>
      </ul>
    </div>
  );
};
