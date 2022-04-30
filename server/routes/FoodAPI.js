const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

//@desc Get all from the database
//@route GET /main/
router.get("/", async (req, res) => {
  try {
    const result = await Food.find();
    res.status(200).send(result);
  } catch (err) {
    res.send("Error");
  }
});

//@desc Add a new food to the database
//@route POST /main/
router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      msg: "Details are missing...",
    });
  }
  try {
    const food = await Food.create({
      name: req.body.name,
      price: req.body.price,
    });
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
