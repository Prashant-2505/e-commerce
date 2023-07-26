import express from "express";
import { registerController, loginController, testController, forgotPasswordController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// Create a new router instance
const router = express.Router();

// Register route
router.post('/register', registerController);

// login route
router.post('/login', loginController);

// Forgot password
router.post('/forgot-password',forgotPasswordController)


// test route
router.get("/test", requireSignIn, isAdmin, testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Export the router
export default router;
