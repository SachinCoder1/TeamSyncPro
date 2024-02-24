require("module-alias/register");
import express from "express";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

import CONNECT_MONGO_DB from "~/db";
import { ENV, PORT } from "~/constants";
import { CLIENT_URL, DEFAULT_API_URL } from "~/config";
import routes from "./routes";
import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import resolvers from "./graphql/resolvers/resolvers";
import gql from "graphql-tag";
import { expressMiddleware } from "@apollo/server/express4";
import { ENV_TYPE } from "./types";

const app = express();

CONNECT_MONGO_DB();

app.use(express.json());
app.use(compression());
app.use(
  helmet({
    crossOriginEmbedderPolicy: ENV !== ENV_TYPE.DEVELOPMENT,
    contentSecurityPolicy: ENV !== ENV_TYPE.DEVELOPMENT,
  })
);
app.use(
  cors({
    origin: [CLIENT_URL],
  })
);

const typeDefs = gql(
  readFileSync("./src/graphql/schema/schema.graphql", {
    encoding: "utf-8",
  })
);

async function main() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers }),
  });
  await server.start();
  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use(`${DEFAULT_API_URL}/user`, routes.user);

  app.all("*", (req, res) => {
    res.status(404).send(`Accessing Invalid route ${req.originalUrl} `);
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}
main();
