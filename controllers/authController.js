import userModel from "../models/userModel.js"
import { comparePassword, hashedPassword } from '../helpers/authHelper.js'
import JWT from "jsonwebtoken"




// register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    if (!name || !email || !password || !address || !answer) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please login",
      });
    }

    const hashPassword = await hashedPassword(password);
    const user = await new userModel({ name, email, phone, password: hashPassword, address,answer }).save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};





// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid  password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.phone,
        phone: user.email,
        address: user.address
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please check your email or password",

    });
  }
};

// forgot password contoller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
// test controler

export const testController = (req, res) => {
  res.send('Protected route')
}
