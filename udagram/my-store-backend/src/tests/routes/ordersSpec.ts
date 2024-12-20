import supertest from 'supertest';
import app from '../../server';
import { globalToken } from '../setup/server_setup';

const request = supertest(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
              'eyJ1c2VyIjp7ImlkIjo1LCJmaXJzdG5hbWUiO' +
              'iJSb2dlciIsImxhc3RuYW1lIjoiVGF5bG9yIi' +
              'wicGFzc3dvcmQiOiIkMmIkMTAkMU03VTJyMlV' +
              'UZS5wdkFDM2lkOGpBdTAwNHBVLnN4NVdtRVpt' +
              'aFE0bEFCdU1TQmlLRWR1enEifSwiaWF0IjoxN' +
              'zI4ODAyMjI3fQ.ELl7aan_U2DPJ2jXNEsfz-R' +
              'juu8l4_u7MQAk8r1bf0c';
const malformedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
              'iJSb2dlciIsImxhc3RuYW1lIjoiVGF5bG9yIi' +
              'wicGFzc3dvcmQiOiIkMmIkMTAkMU03VTJyMlV' +
              'UZS5wdkFDM2lkOGpBdTAwNHBVLnN4NVdtRVpt' +
              'aFE0bEFCdU1TQmlLRWR1enEifSwiaWF0IjoxN' +
              'zI4ODAyMjI3fQ.ELl7aan_U2DPJ2jXNEsfz-R' +
              'juu8l4_u7MQAk8r1bf0c';
const productItem = { userId : 1, productId : 1, quantity : 2 };
const user = { userId : 5 };

describe('Test endpoint responses', () => {
    // /api/orders
    it('getting the list of orders for the given user gives a 401-error if user token is not set', async () => {
        const response = await request.get('/api/orders');
        expect(response.status).toBe(401);
    });
   
    it('getting the list of all orders for the given user works if user token is set', async () => {
        const response = await request
        .get('/api/orders')
        .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(200);
    });
    
    it('getting the list of orders for the given user gives an error if malformed user token is set', async () => {
        const response = await request
        .get('/api/orders')
        .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });
 
    // /orders/order/current
    it('getting the active order for the given user gives a 401-error if user token is not set', async () => {
        const response = await request.get('/api/orders/order/current');
        expect(response.status).toBe(401);
    });
    it('getting the list of orders for a new user returns nothing', async () => {
        const response = await request
        .get('/api/orders/order/current')
        .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(404);
    });
    it('getting the list of orders for the given user gives an error if malformed user token is set', async () => {
        const response = await request
        .get('/api/orders/order/current')
        .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });

    // /orders/order/items
    it('adding order item to the given user\'s active order gives 401-error if user token is not set', async () => {
        const response = await request
            .post('/api/orders/order/items')
            .send(productItem);
        expect(response.status).toBe(401);
    });
    it('adding order item to the given user\'s active order works OK if user token is set', async () => {
        const response = await request
            .post('/api/orders/order/items')
            .send(productItem)
            .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(201);
        const getOrderResponse = await request
            .get('/api/orders/order/current/')
            .set('Authorization', `Bearer ${globalToken}`);
        expect(getOrderResponse.status).toBe(200);
    });
   it('adding order item to the given user"s active order gives an error if malformed user token is set', async () => {
        const response = await request
            .post('/api/orders/order/items')
            .send(productItem)
            .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });

    // /order/close
   it('adding order item to the given user"s active order gives 401-error if user token is not set', async () => {
        const response = await request
            .put('/api/orders/order/close')
            .send(user);
        expect(response.status).toBe(401);
    });
    it('adding order item to the given user"s active order works OK if user token is set', async () => {
        const response = await request
            .put('/api/orders/order/close')
            .send(user)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('adding order item to the given user"s active order gives an error if malformed user token is set', async () => {
        const response = await request
            .put('/api/orders/order/close')
            .send(user)
            .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });
});


/*
ordersRouter.get('/', verifyAuthToken, getOrders);
ordersRouter.get('/order/current', verifyAuthToken, getCurrentOrder);
ordersRouter.post('order/items', verifyAuthToken, addProductToCurrentOrder);
ordersRouter.put('/order/close', verifyAuthToken, closeCurrentOrder);
*/
