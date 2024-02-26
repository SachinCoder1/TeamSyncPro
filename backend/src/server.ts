require("module-alias/register");
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

import CONNECT_MONGO_DB from "~/db";
import { PORT } from "~/constants";
import { CLIENT_URL, DEFAULT_API_URL } from "~/config";
import routes from "~/routes";

// 🔴 let's make apis in a way that in frontend we can pass what things we want using fields in request params and it gives only that fields... we can use this fields thing instead of graphql

const app = express();

CONNECT_MONGO_DB();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_URL],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(`${DEFAULT_API_URL}/auth`, routes.auth);
app.use(`${DEFAULT_API_URL}/user`, routes.user);
app.use(`${DEFAULT_API_URL}/workspace`, routes.workspace);

app.all("*", (req, res) => {
  res.status(404).send(`Accessing Invalid route ${req.originalUrl} `);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
