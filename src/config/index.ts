import { config } from 'dotenv';
/* --- config for multiple env --- */
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_TYPE, DB_NAME, DB_USER, DB_PASSWORD, ACCESS_TOKEN, REFRESH_TOKEN, API_URL, APP_URL, API_VERSION } = process.env;

