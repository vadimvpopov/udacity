import bcrypt from 'bcrypt'
import Client from '../database'

const pepper = process.env.PEPPER as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
    id?: Number;
    fullName: String;
    password: String;
}

export class UsersStore {
    async getUsers(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users;';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql);
            const resUsers = result.rows;
            conn.release();
            return resUsers;
        } catch (err) {
            throw new Error(`Model: Could not return list of users: ${err}`)
        }
    }

    async getUser(id:number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [id]);
            const resUser = result.rows[0];
            conn.release();
            return resUser;
        } catch (err) {
            throw new Error(`Could not get data for user ${id}: ${err}`)
        }
    }

    async createUser(fullName:string, password:string): Promise<User> {
        try {
            const sql = 'INSERT INTO users (fullName, password) VALUES($1, $2) RETURNING *'
            const hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds));
            //console.log("Calculated hash: ", hash);
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [fullName, hash]);
            const resUser = result.rows[0];
            conn.release();
            return resUser;
        } catch (err) {
            throw new Error(`Could not add user ${fullName}: ${err}`)
        }
    }

    async loadUser(user:User): Promise<User|null> {
        try {
            const sql = 'SELECT * FROM users WHERE fullName=$1';
            //@ts-ignore
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [user.fullName]);
            
            conn.release();
            if (!result.rows.length) {
                //throw Error(`No user ${user.firstName} ${user.lastName} found!`);
                return null;
            }
            const resUser = result.rows[0];
            if (!bcrypt.compareSync(user.password+pepper, resUser.password)) {
                throw Error(`Password for ${user.fullName} is not correct!`);
            }
            return resUser;
        } catch (err) {
            throw new Error(`Could not authenticate user ${user.fullName}: ${err}`)
        }
    }
}