const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

//@desc post data to orders
//@route POST order/add-order
router.post("/add-order", async (req, res) => {
  const { userId, itemId, itemName, itemPrice, itemQuantity } = req.body;
  const order = await Order.create({
    userId,
    itemId,
    itemName,
    itemPrice,
    itemQuantity,
  });
  res.json({
    success: true,
    order,
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
});

//@desc get user id related orders
//@route POST order/add-order
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Order.find({ userId: id });
  res.json({
    success: true,
    order,
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
