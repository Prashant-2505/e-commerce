import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// protected route token based

export const requireSignIn = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (error) {
        console.log(error);
        // You need to handle the error appropriately, such as sending an error response
        return res.status(401).json({ error: 'Invalid token' });
    }
};


// admin acess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
    if (user.role !== 1) {
        return res.status(401).send({
            success: false,
            message: "unauthorize acess"
        })
    }
    else {
        next()
    }
    } catch (error) {
         console.log(error)
         res.status(401).send({
            success:false,
            error,
            message:"error in admin middleware"
         })
    }
}