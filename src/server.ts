import "reflect-metadata";
import app from "./app";
import { NODE_ENV, PORT } from "./config/index";
import dbConnection from "./db/index";

/* --- Start Database and Server --- */
dbConnection
  .initialize()
  .then(() => {
    console.log("Database initialized!");
    app.listen(PORT, () => {
        console.log(`[INFO] Environment: ${NODE_ENV}`)
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
