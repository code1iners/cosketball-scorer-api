require("dotenv").config();
import { typeDefs, resolvers } from "./schema";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import { findUserByToken, protectedResolver } from "./utils/users/users.utils";

/**
 * ### Run API server.
 */
const runServer = async () => {
  // Setting server.
  const app = express();
  const httpServer = http.createServer(app);

  // Create server.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      if (ctx.req) {
        const { token } = ctx.req.headers;
        return {
          token,
          protectedResolver,
          me: await findUserByToken(token),
        };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start server.
  await server.start();

  // Set middleware.
  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  server.applyMiddleware({
    app,
    path: "/",
  });

  // Listen.
  await new Promise((resolve) => httpServer.listen(process.env.PORT, resolve));
  console.info(`Server running..`);
};

runServer();
