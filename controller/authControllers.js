const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWTToken = (user) => {
  const token = jwt.sign(
    {
      exp: 120,
      data: {
        userId: user._id,
        email: user.email,
      },
    },
    process.env.JWT_SECRET
  );
  return token;
};
const singUp = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email, mobile });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }
    if (!email || !password || !name || !mobile) {
      return res.status(400).json({
        status: "fail",
        msg: "Input required",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created",
      data: { user: newUser },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.status(400).json({
        msg: "Invalid User",
        status: "failed",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }

    const hashPasswords = user.password;
    const isCorrectPassword = await bcrypt.compare(password, hashPasswords);

    if (!isCorrectPassword) {
      res.status(401).json({ status: "Failed", msg: "Unauthorized User" });
    } else {
      res.status(200).json({
        message: "Login successful",
        data: {
          user: {
            name: user.name,
            email: user.email,
          },
          token: generateJWTToken(user),
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = { singUp, userLogin };
