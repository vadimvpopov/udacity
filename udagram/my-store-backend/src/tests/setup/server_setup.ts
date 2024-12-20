import supertest from 'supertest';
import app from '../../server';

const firstUser = { firstName: 'John', lastName: 'Dow', password: '123' };
const secondUser = { firstName: 'Davie', lastName: 'Johns', password: '123' };
const product = { name: 'AirCleaner', price: 2, category: 'Appliances'  };

let globalToken:any;
let globalProduct:any;
beforeAll(async () => {
    console.log("beforeAll:");
    const request = supertest(app);
    const response = await request.post('/api/users')
    .send(firstUser);


    //@ts-ignore
    globalToken = response.body;
    const token = response.body;
    //@ts-ignore
    //console.log(global.token, token);

    const productResponse = await request.post('/api/products')
    .send(product)
    .set('Authorization', `Bearer ${token}`);
    //@ts-ignore
    globalProduct = productResponse.body;
    //console.log(`returned product ${productResponse.body}`)
    // Insert one more user that is going to be used for model tests
    await request.post('/api/users').send(secondUser);
});

export {
    globalToken,
    globalProduct
}