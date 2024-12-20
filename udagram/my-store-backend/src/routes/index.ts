import express from 'express';
import productsRouter from './api/products';
import usersRouter from './api/users';
import ordersRouter from './api/orders';

const router = express.Router();
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export default router;
