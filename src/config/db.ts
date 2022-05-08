import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
} from "../utils/secrets";

export const db = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

db.initialize()
  .then(() => {
    console.log(`Data Source with typeorm has been initialized successfully.`);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
