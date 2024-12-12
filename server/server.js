import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import cors from 'cors';

import { productRouter } from './routes/products.js';
import { brandRouter } from './routes/brands.js';
import { cartRouter } from './routes/carts.js';
import { authRouter } from './routes/auth.js';
import { reviewRouter } from './routes/reviews.js';
import { orderRouter } from './routes/orders.js';
import { usersRouter } from './routes/users.js';

import { verifyToken } from './middleware/verifyToken.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express()

// Allows to parse req.body as json
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.status(200).json({message:'API is working'});
})

app.use('/api/products', verifyToken, productRouter);
app.use('/api/brands', verifyToken, brandRouter);
app.use('/api/cart', verifyToken, cartRouter);
app.use('/api/orders', verifyToken, orderRouter);
app.use('/api/reviews', verifyToken, reviewRouter);
app.use('/api/users', verifyToken, usersRouter);
app.use('/api/auth', authRouter);

const port  = process.env.PORT || 5080;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})