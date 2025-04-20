const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("Error connect mongodb"));

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
