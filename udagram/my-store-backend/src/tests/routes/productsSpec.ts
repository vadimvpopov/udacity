import supertest from 'supertest';
import app from '../../server';
import { globalToken, globalProduct } from '../setup/server_setup';


const request = supertest(app);
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
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
const productItem = { userId : 1, productId : 1, quantity : 1 };
const productNo16 = { id: 16, name: 'X5', price:'15000', category: 'Cars'  };
const product = { name: 'Bread', price: 1, category: 'Foods'  };
const user = { userId : 5 };

describe('Test endpoint responses for products', () => {
    // /api/orders
    it('getting the list of products works', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    // /show/:productId
    it('getting the info about specific product works', async () => {
        const response = await request.get('/api/products/show/1');
        expect(response.status).toBe(200);
        console.log('Returned product', response.body);
        expect(response.body.name).toEqual(globalProduct.name);
        expect(response.body.category).toEqual(globalProduct.category);
    });

    it('getting the info about product with wrong id returns 400', async () => {
        const response = await request.get('/api/products/show/e1');
        expect(response.status).toBe(400);
    });

    it('getting the info about non-existent product gives 404', async () => {
        const response = await request.get('/api/products/show/16');
        expect(response.status).toBe(404);
    });

    // /api/orders post
    it('creating a new product without a user token fails as unauthorized ', async () => {
        const response = await request.post('/api/products')
            .send(product);
        expect(response.status).toBe(401);
    });

    it('creating a new product with a user token works as expected', async () => {
        const response = await request.post('/api/products')
            .send(product)
            .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(200);
    });
    it('creating a new product with a malformed user token fails with 401', async () => {
        const response = await request.post('/api/products')
            .send(product)
            .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });

    // /most-popular-products
    it('getting the list of most popular products (only 1 for now)', async () => {
        const response = await request.get('/api/products/most-popular-products');
        expect(response.status).toBe(200);
        expect(response.body[0].productid).toEqual('1');
    });

    // /category-products/:category
    it('getting the list of products in category Foods returns 1 item', async () => {
        const response = await request.get('/api/products/category-products/Foods');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
    });
});