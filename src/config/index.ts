import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_TYPE, DB_NAME, DB_USERNAME, DB_PASSWORD, SECRET_KEY, API_URL, APP_URL, API_VERSION } = process.env;

