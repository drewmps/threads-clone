import UserModel from "../models/UserModel.js";

export const userTypeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }
  type Query {
    getUsers: [User]
  }
  input UserInput {
    name: String
    username: String
    email: String
    password: String
  }
  type Mutation {
    registerUser(newUser: UserInput): String
  }
`;
export const userResolvers = {
  Query: {
    getUsers: async () => {
      const users = await UserModel.find();
      return users;
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const message = await UserModel.register(args.newUser);
      return message;
    },
  },
};
