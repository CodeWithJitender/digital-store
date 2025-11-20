import express from 'express';
import { Product } from '../models/productModel';

const router = express.Router();
// Route to create a new product localhost:5000/api/products/
router.post('/', async (req, res) => {
    try {
        // Validate request body required fields
        if(!req.body.name || !req.body.price || !req.body.imageUrl || !req.body.category) {
            // return error if any required field is missing
            return  res.status(400).json({message: 'All fields are required'});
        }
        // Create a new product
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            category: req.body.category
        });

        // Save the product to the database
        await product.save();
        // Return the created product in the response
        res.status(201).json(product);
        
    } catch (error) {
        console.log('Error creating product:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});
export default router;