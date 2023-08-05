import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { createProductController, getProductController, getSingleProductController, deleteProductController,getPhotoController, updateProductController,filterController,productCountController, productListController, searchProductController, relatedProductController, braintreeTokenController, braintreePaymentController } from '../controllers/productController.js'
import formidable from 'express-formidable'



const router = express.Router()


// routes

// create product
router.post('/create-product',formidable(),createProductController)
// get product
router.get('/get-product',getProductController)
// get single product
router.get('/get-singleProduct/:slug',getSingleProductController)
// get photo
router.get('/get-photo/:pid',getPhotoController)
// delete product
router.delete('/delete-product/:pid',deleteProductController)
// router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
 // it need to check user is sigin or admin but in my case there is error so i m removing it original route is below

// update product
router.put('/update-product/:pid',formidable(),updateProductController)
// it need to check user is sigin or admin but in my case there is error so i m removing it original route is below
// router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)


// filter product
router.post('/product-filter',filterController)
// product count
router.get('/product-count',productCountController)
// product per page
router.get('/product-list/:page',productListController)
// search route
router.get('/search/:keyword',searchProductController)
// simlilar product
router.get('/related-product/:pid/:cid',relatedProductController)

// payement route
//token
router.get('/braintree/token',braintreeTokenController)
//payment
router.post('/braintree/payemnt',braintreePaymentController)

export default router