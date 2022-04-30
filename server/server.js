const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
var cors = require("cors");
const port = 4600;

const app = express();
//DB connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/food", require("./routes/FoodAPI"));
app.use("/users", require("./routes/UserAPI"));
app.use("/order", require("./routes/OrderAPI"));

app.get("/", (req, res) => res.send("Hello World!!!"));
app.listen(port, () => console.log(`App listening on port ${port}!`));
