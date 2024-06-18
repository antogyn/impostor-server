import cors from "@fastify/cors";
import fastify from "fastify";
import codegenMercurius from "mercurius-codegen";
import { registerResolvers } from "./resolvers";

const server = fastify();

server.register(cors, {
  origin: true,
});

registerResolvers(server);

codegenMercurius(server, {
  targetPath: "./src/graphql/generated.ts",
  codegenConfig: {
    enumsAsConst: true,
  },
}).catch(console.error);

server.listen(
  { port: 3000, host: process.env["NODE_ENV"] === "production" ? "0.0.0.0" : "localhost" },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
