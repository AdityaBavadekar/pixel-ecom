import { Router } from 'express';
import { getMyOrders, addOrder } from '../controllers/orderController.js';

const router = Router();

router.get('/', getMyOrders);
router.post('/', addOrder);

export { router as orderRouter };