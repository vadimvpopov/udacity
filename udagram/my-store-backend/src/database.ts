import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    POSTGRES_USER_TEST,
    ENV,
} = process.env;

console.log('ENV: ', ENV);

const client = new Pool({
    host: POSTGRES_HOST,
    database: (ENV === 'test') ? POSTGRES_DB_TEST: POSTGRES_DB,
    user: (ENV === 'test') ? POSTGRES_USER_TEST : POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
});

export default client;