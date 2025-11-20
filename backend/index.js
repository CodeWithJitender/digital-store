import express from 'express';
// import dotenv package to manage environment variables
import {config} from 'dotenv';

// import mongoose package to interact with MongoDB
import mongoose from 'mongoose';

// import cors package to handle Cross-Origin Resource Sharing
import cors from 'cors';

// import cloudinary package to handle cloud media storage
import {v2 as cloudinary} from 'cloudinary';

// import multer package to handle file uploads
import multer from 'multer';

// import multer-storage-cloudinary to integrate multer with Cloudinary
import {CloudinaryStorage} from 'multer-storage-cloudinary';

// import product routes
import productRouter from './routes/productRoute.js';

config(); // Load environment variables from .env file

const app = express();

// To allow cross-origin requests
app.use(cors()); 

// Configure MongoDB connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Resquest body parser middleware to parse JSON bodies
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 


// Use product routes
app.use('/product', productRouter);