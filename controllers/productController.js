import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';
import dotenv from 'dotenv'

dotenv.config()

// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// create product
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });

        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: 'Photo should be less than 1 MB in size' });
        }

        const product = new productModel({
            name,
            description,
            price,
            category,
            quantity,
            shipping,
            slug: slugify(name),
        });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error,
        });
    }
};




// get product
export const getProductController = async (req, res) => {
    try {

        const product = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate('category')
        res.status(201).send({
            success: true,
            total: product.length,
            message: 'All Product getting successfully',
            product,

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error,
        });
    }
}


// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({ slug }).select("-photo").populate('category')

        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(201).send({
            success: true,
            message: 'Product getting successfully',
            product,

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error,
        });
    }
}




// delete product
export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params
        await productModel.findByIdAndDelete(pid)

        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error,
        });
    }
}


// get photo
export const getPhotoController = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findById(pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product photo',
            error,
        });
    }
}



// update product 
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });

        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: 'Photo should be less than 1 MB in size' });
        }

        const { pid } = req.params
        const product = await productModel.findByIdAndUpdate(pid,
            { ...req.fields, slug: slugify(name) }, { new: true });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating  product',
            error,
        });
    }
}



// filter

export const filterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};

        if (checked.length > 0) {
            args.category = checked;
        }

        // Check the length of radio array to ensure a valid price filter is applied
        if (radio.length === 2) {
            args.price = { $gte: radio[0], $lte: radio[1] };
        }

        const product = await productModel.find(args);
        res.status(200).send({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error,
        });
    }
};


// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: "Error in product count",
            error
        })
    }
}

// product list base on page

export const productListController = async (req, res) => {
    try {
        const perPage = 4;
        const page = req.params.page // Parse the page parameter to an integer

        const product = await productModel
            .find({})
            .select('-photo') // Exclude the 'photo' field from the selected documents
            .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
            .skip((page - 1) * perPage)
            .limit(perPage)


        res.status(200).send({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in per page ctrl",
            error,
        });
    }
};
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ],
            })
            .select("-photo");

        res.json(result);
    } catch (error) {
        console.error("Error in search product:", error);
        res.status(500).send({
            success: false,
            message: "Error in searching products",
            error: error.message,
        });
    }
};

// siilar product
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const product = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            product
        })
    } catch (error) {
        console.error("Error in search product:", error);
        res.status(500).send({
            success: false,
            message: "Error in searching related products",
            error: error.message,
        });
    }
}


// payment gateway api
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body; // Assuming the 'cart' array contains the products to be purchased

        // Calculate the total amount from the cart
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });

        // Create a new transaction using the gateway
        gateway.transaction.sale({
            amount: total.toFixed(2), // Ensure that the amount is in the correct format (e.g., "12.34")
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            },
        }, (error, result) => {
            if (result && result.success) {
                // If the transaction is successful, create an order and save it to the database
                const order = new orderModel({
                    products: cart,
                    payment: result.transaction,
                    buyer: req.user ? req.user._id : "unauthenticated user",
                });

                order.save((err) => {
                    if (err) {
                        res.status(500).json({ error: "Error creating the order" });
                    } else {
                        res.json({ ok: true });
                    }
                });
            } else {
                // If there's an error with the transaction, handle it
                res.status(500).json({ error: error ? error.message : "Transaction failed" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};
