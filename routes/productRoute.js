import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { createProductController, getProductController, getSingleProductController, deleteProductController,getPhotoController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'



const router = express.Router()


// routes

// create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
// get product
router.get('/get-product',getProductController)
// get single product
router.get('/get-singleProduct/:slug',getSingleProductController)
// get photo
router.get('/get-photo/:pid',getPhotoController)
// delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
// update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

export default router