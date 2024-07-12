const express = require("express");
const { singUp, userLogin } = require("../controller/authControllers");
const authRouter = express.Router();
authRouter.route("/signup").post(singUp);
authRouter.route("/login").post(userLogin);

module.exports = { authRouter };
