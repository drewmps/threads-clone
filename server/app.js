import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import { userResolvers, userTypeDefs } from "./schemas/userSchema.js";
import { postResolvers, postTypeDefs } from "./schemas/postSchema.js";
import { followResolvers, followTypeDefs } from "./schemas/followSchema.js";
import { verifyToken } from "./helpers/jwt.js";
import UserModel from "./models/UserModel.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req, res }) => {
    const authN = async function () {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");
      const payload = verifyToken(token);
      const user = await UserModel.findOne(payload.id);
      if (!user) throw new Error("Unauthorized");
      return user;
    };
    return { authN };
  },
});
console.log(`🚀  Server ready at: ${url}`);
