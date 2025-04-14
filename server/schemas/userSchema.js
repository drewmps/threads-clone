import UserModel from "../models/UserModel.js";

export const userTypeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }
  type LoginResponse {
    access_token: String
  }

  type Query {
    getUsers: [User]
    login(username: String, password: String): LoginResponse
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
    login: async (_, args) => {
      const response = await UserModel.login(args);
      return response;
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const message = await UserModel.register(args.newUser);
      return message;
    },
  },
};
