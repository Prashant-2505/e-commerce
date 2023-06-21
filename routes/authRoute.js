import express from "express";
import { registerController,loginController } from "../controllers/authController.js";
// Create a new router instance
const router = express.Router();

// Register route
router.post('/register',registerController);

// login route
router.post('/login',loginController);

// Export the router
export default router;
