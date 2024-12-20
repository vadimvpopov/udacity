import express from 'express';
import { OrdersStore } from '../../models/orders';
import { strToNumeric, verifyAuthToken } from '../../utilities/utils';

const ordersRouter = express.Router();
const ordersStore = new OrdersStore();

const getOrders = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //@ts-ignore
        const userId = strToNumeric(req.userId as string);
        //console.log("body: ", userId);
        const orders = await ordersStore.getOrders(userId);
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const getCurrentOrder = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //@ts-ignore
        const userId = strToNumeric(req.userId as string);
        
        const order = await ordersStore.getCurrentOrder(userId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json(`No current order found for userid ${userId}`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const addProductToCurrentOrder = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        console.log("add product body: ", req.body);
        const userId = strToNumeric(req.body.userId);
        const productId = strToNumeric(req.body.productId);
        const quantity = strToNumeric(req.body.quantity);
        const order = await ordersStore.addProductToCurrentOrder(userId, productId, quantity);
        res.status(201).json(order);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const closeCurrentOrder = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        console.log("close order body: ", req.body);
        const userId = strToNumeric(req.body.userId);
        const order = await ordersStore.closeOrder(userId);
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

ordersRouter.get('/', verifyAuthToken, getOrders);
ordersRouter.get('/order/current', verifyAuthToken, getCurrentOrder);
ordersRouter.post('/order/items', verifyAuthToken, addProductToCurrentOrder);
ordersRouter.put('/order/close', verifyAuthToken, closeCurrentOrder);

export default ordersRouter;
