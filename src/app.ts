import express from "express";
import "reflect-metadata";
import { APP_URL, API_VERSION } from "./config/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import routes from './routes/index';

const app: express.Application = express();

/* --- Options for Cors --- */
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: APP_URL,
  preflightContinue: false,
};

/* --- Middlewares --- */
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use("/static", express.static(__dirname + "/static"));
app.use(ErrorHandler);

/* --- Initialize routes --- */
app.use(`/${API_VERSION}`, routes);

export default app;
