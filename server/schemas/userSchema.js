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

  type Follow {
    username: String
  }
  type ReturnUser {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    following: [Follow]
    follower: [Follow]
  }
  type Query {
    getUsers: [User]
    searchUser(keyword: String): [User]
    getUserById(userId: ID): ReturnUser
    getCurrentUser: ReturnUser
  }

  input UserInput {
    name: String
    username: String!
    email: String!
    password: String!
  }
  type Mutation {
    registerUser(newUser: UserInput): String
    login(username: String, password: String): LoginResponse
  }
`;
export const userResolvers = {
  Query: {
    getUsers: async (_, args, contextValue) => {
      const { authN } = contextValue;
      await authN();
      const users = await UserModel.find();
      return users;
    },
    searchUser: async (_, args, contextValue) => {
      const { authN } = contextValue;
      await authN();
      const users = await UserModel.search(args);
      return users;
    },
    getUserById: async (_, args, contextValue) => {
      const { authN } = contextValue;
      await authN();
      const user = await UserModel.getUserById(args);
      return user;
    },
    getCurrentUser: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();
      const currentUser = await UserModel.getUserById({ userId: user._id });
      return currentUser;
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const message = await UserModel.register(args.newUser);
      return message;
    },
    login: async (_, args) => {
      const response = await UserModel.login(args);
      return response;
    },
  },
};
