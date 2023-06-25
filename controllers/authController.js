import userModel from "../models/userModel.js"
import { comparePassword, hashedPassword } from '../helpers/authHelper.js'
import JWT from "jsonwebtoken"




// register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !address) {
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
    const user = await new userModel({ name, email, phone, password: hashPassword, address }).save();
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
      user:{
        name:user.name,
        email:user.phone,
        phone:user.email,
        address:user.address
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



// test controler

export const testController = (req,res)=>
{
    res.send('Protected route')
}
