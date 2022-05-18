import { DataSource } from 'typeorm'
import { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } from '../config/index';

const dbConnection = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

export default dbConnection;