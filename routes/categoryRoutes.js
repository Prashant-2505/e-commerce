import express from'express';
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, updateCategoryController ,categoryController, singleCategoryController, deleteCategoryController} from '../controllers/categoryController.js';

const router = express.Router();

// create category route
router.post("/create-category",requireSignIn,isAdmin,createCategoryController);
// update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)
// get all category
router.get("/get-category",categoryController)
// get single category
router.get("/get-SingleCategory/:slug",singleCategoryController)
// delete single category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)




export default router;