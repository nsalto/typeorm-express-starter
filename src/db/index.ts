import { DataSource } from 'typeorm'
import { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD } from '../config/index';

const DB_Connection = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
});

export default DB_Connection;