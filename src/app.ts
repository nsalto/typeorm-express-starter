import express from 'express';
import 'reflect-metadata';
import { PORT, APP_URL, API_VERSION } from './config/index';
import cors from 'cors';
import DB_Connection from 'db';
import cookieParser from 'cookie-parser';
import { apiErrorHandler } from 'middlewares/ErrorHandler';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'

const app: express.Application = express();

/* --- Options for Cors --- */
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: APP_URL,
    preflightContinue:false
}

/* --- Middlewares --- */
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/static'));

export const startSertver = async () => {
    /* --- DB Connection --- */
    DB_Connection.initialize()
        .then(() => {
            console.log("Database has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Database initialization", err)
        })

    /* --- Auth Routes --- */
    app.use(`/${API_VERSION}/auth`, authRoutes);
    /* --- User Routes --- */
    app.use(`/${API_VERSION}/users`, userRoutes);

    /* --- Handle the api errors --- */
    app.use(apiErrorHandler);
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}

/* --- Start server --- */
startSertver();