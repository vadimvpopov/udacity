import express from 'express';
import {User, UsersStore} from '../../models/users'
import jwt from 'jsonwebtoken';
import { strToNumeric, verifyAuthToken, verifyAuthTokenAnCheckUser } from '../../utilities/utils'

const usersRouter = express.Router();

const getUsers = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //console.log("body: ", req.body);
        const userStore = new UsersStore();
        const users = await userStore.getUsers();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const getUser = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = strToNumeric(req.params.userId);
        const userStore = new UsersStore();
        const user = await userStore.getUser(id);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }    
}


const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        console.log("create user body: ", req.body);
        const {fullName, password} = req.body;
        const userStore = new UsersStore();
        const result = await userStore.createUser(fullName, password);
        const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET as string)
        res.json(token);
    } catch (err) {
        console.log(err);
        //@ts-ignore
        res.status(400).json('Error creating user: ' + err.message);
    }
}

const authenticate = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        console.log("authenticate user body: ", req.body);
        const user: User = {
            fullName: req.body.fullName,
            password: req.body.password,
        }
        if (!user.fullName) {
            throw Error('No user data passed!')
        }
        const userStore = new UsersStore();
        const u = await userStore.loadUser(user)
        var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch(error) {
        console.log(error);
        //@ts-ignore
        res.status(401).json(error.message);
    }
}

usersRouter.get('/', verifyAuthToken, getUsers);
usersRouter.get('/:userId', verifyAuthTokenAnCheckUser, getUser);
usersRouter.post('/', createUser);
usersRouter.post('/authenticate', authenticate);

export default usersRouter;
