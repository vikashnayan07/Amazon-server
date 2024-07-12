const express = require("express");
const dotenv = require("dotenv");
const { authRouter } = require("./router/authRoutes.js");
const cors = require("cors");
dotenv.config();
require("./config/db.js");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`--------server started at ${PORT}-----------`);
});
