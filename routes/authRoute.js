import express from "express";
import { registerController,loginController,testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// Create a new router instance
const router = express.Router();

// Register route
router.post('/register',registerController);

// login route
router.post('/login',loginController);

// test route
router.get("/test",requireSignIn,isAdmin, testController)

// Export the router
export default router;
