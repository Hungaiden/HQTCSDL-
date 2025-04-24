import * as database from "./src/config/database.js";
import * as routeAdmin from "./src/routes/admin/index.route.js";

import express from "express";
import bodyParser from 'body-parser';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);

import methodOverride from 'method-override';
import cors from "cors";

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());

database.connect();

app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));

app.locals.prefixAdmin = "admin";

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

routeAdmin.index(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});