import supertest from 'supertest';
import app from '../../server';
import { globalToken } from '../setup/server_setup';


const request = supertest(app);
const malformedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
              'iJSb2dlciIsImxhc3RuYW1lIjoiVGF5bG9yIi' +
              'wicGFzc3dvcmQiOiIkMmIkMTAkMU03VTJyMlV' +
              'UZS5wdkFDM2lkOGpBdTAwNHBVLnN4NVdtRVpt' +
              'aFE0bEFCdU1TQmlLRWR1enEifSwiaWF0IjoxN' +
              'zI4ODAyMjI3fQ.ELl7aan_U2DPJ2jXNEsfz-R' +
              'juu8l4_u7MQAk8r1bf0c';
const newUser = { firstName : 'Joan', lastName: 'Dowson', password: '123' };

describe('Test endpoint responses for users', () => {
    // /api/users
    it('getting the list of users for the given user gives a 401-error if user token is not set', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(401);
    });
    it('getting the list of users with a proper auth-token works as expected', async () => {
        const response = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
    it('getting the list of users for the given user gives a 401-error if user token is malformed', async () => {
        const response = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });

    // /api/users/:userId
    it('getting the the user info  gives a 401-error if user token is not set', async () => {
        const response = await request.get('/api/users/1');
        expect(response.status).toBe(401);
    });
    it('getting the the user info  works if a proper user token is set', async () => {
        const response = await request
                    .get('/api/users/1')
                    .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(200);
        expect(response.body.firstname).toEqual('John');
        expect(response.body.lastname).toEqual('Dow');
    });
    it('getting the the user info gives 401-error if user token is malformed', async () => {
        const response = await request
                    .get('/api/users/1')
                    .set('Authorization', `Bearer ${malformedToken}`);
        expect(response.status).toBe(401);
    });
    it('getting user info for non-existent user returns an error even if a correct auth-token is set', async () => {
        const response = await request
                    .get('/api/users/2')
                    .set('Authorization', `Bearer ${globalToken}`);
        expect(response.status).toBe(401);
    });

    // /api/users POST
    it('creating new user works and the number of users gets increased to 2', async () => {
        const createResponse = await request
            .post('/api/users')
            .send(newUser);
        expect(createResponse.status).toBe(200);
        const token = createResponse.body;
        const getResponse = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.length).toBe(3);
    });

    // /api/users/authenticate POST
    it('the returned token after authentication allows to get the list of all the users  ', async () => {
        const authResponse = await request
            .post('/api/users/authenticate')
            .send(newUser);
        expect(authResponse.status).toBe(200);
        const token = authResponse.body;
        const getResponse = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.length).toBe(3);
    });
});
/*
usersRouter.get('/', verifyAuthToken, getUsers);
usersRouter.get('/:userId', verifyAuthTokenAnCheckUser, getUser);
usersRouter.post('/', createUser);
usersRouter.post('/authenticate', authenticate);
*/
