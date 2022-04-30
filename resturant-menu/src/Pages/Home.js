import React, { useState, useEffect } from "react";
import { Cart } from "../Components/Cart";
import { Navbar } from "../Components/Navbar";
import MenuList from "./MenuList";
import OrderHistory from "./OrderHistory";

export const Home = () => {
  const [page, setPage] = useState("MenuList");
  const [userData, setUserData] = useState([]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  //@desc get logged in user information
  useEffect(() => {
    if (sessionStorage.getItem("User")) {
      setUserData(JSON.parse(sessionStorage.getItem("User")));
    }
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-4">
          {/* Navigation Bar  */}
          <div className="mb-2">
            <Navbar handlePageChange={handlePageChange} page={page} />
          </div>
          {/* Cart Item  */}
          <div className="mt-2">
            <Cart userId={userData.id} />
          </div>
        </div>
        <div className="col-8">
          {/*Load Component according to 'handlePageChange' function */}
          {page === "MenuList" ? <MenuList /> : null}
          {page === "OrderHistory" ? (
            <OrderHistory userId={userData.id} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
