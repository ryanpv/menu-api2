/**
 * Required External Modules
 */


import * as dotenv from "dotenv"; //importing from external modules - DotEnv is lightweight npm package that auto matically loads environment variables from a .env file into the process
import express from "express"; //exporess is minimal/flexible node.js web app server framework (building web applications)
import cors from "cors"; // (Cross-Origin Resource Sharing) - system consistening of transmitting HTTP headers, determines whether browsers block frontend JS from accessing resposnes for
//Cross-Origin requests
//CORS is a mechanism that allows restricted resources on web page to be requested from another domain outside domain from which first resource was served 
import helmet from "helmet";// node.js module that helps secure HTTP headers returned by Express apps
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();//cnofigures the dotenv??? parameters and inital settings???

/**
 * App Variables
 */

if (!process.env.PORT) { //checks if Node.js loaded the environment variable PORT into process.env
   process.exit(1); //if not, then exit application
}

const PORT: number = parseInt(process.env.PORT as string, 10); //if node.js env loaded then parse it's value as NUMBER type and create an instance??? of an Express application???

const app = express(); //is this the instance???

/**
 *  App Configuration
 */
// mounting middleware functions from the packages that have been imported
app.use(helmet()); //14 small middleware functions that set HTTP response headers
app.use(cors()); //enables all CORS requests
app.use(express.json()); // with express.json(), you parse incoming requests with JSON payloads, which populates the request object with new BODY object containing the parsed data
app.use("/api/menu/items", itemsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

 app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); // this creates the Express server