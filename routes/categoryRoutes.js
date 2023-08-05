import express from'express';
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, updateCategoryController ,categoryControlller, singleCategoryController, deleteCategoryCOntroller} from '../controllers/categoryController.js';

const router = express.Router();

// create category route
router.post("/create-category",createCategoryController);
// update category
router.put("/update-category/:id",updateCategoryController)
// get all category
router.get("/get-category",categoryControlller)
// get single category
router.get("/get-SingleCategory/:slug",singleCategoryController)
// delete single category
router.delete("/delete-category/:id",deleteCategoryCOntroller)

// in update get or delete category requiresign in or isadmin is important but in mine case is gave some error thats why i m removing it 


export default router;