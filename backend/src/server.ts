require("module-alias/register");
import express from "express";
import CONNECT_MONGO_DB from "~/db";
import { PORT } from "~/constants";
const app = express();
import dotenv from 'dotenv';
dotenv.config();

CONNECT_MONGO_DB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
