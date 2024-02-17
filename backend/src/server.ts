require("module-alias/register");
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

import CONNECT_MONGO_DB from "~/db";
import { PORT } from "~/constants";
import { CLIENT_URL } from "~/config";

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

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
