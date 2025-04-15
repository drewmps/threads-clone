import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import { userResolvers, userTypeDefs } from "./schemas/userSchema.js";
import { postResolvers, postTypeDefs } from "./schemas/postSchema.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs],
  resolvers: [userResolvers, postResolvers],
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});
console.log(`🚀  Server ready at: ${url}`);
