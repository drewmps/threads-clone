import FollowModel from "../models/FollowModel.js";

export const followTypeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }
  input FollowInput {
    followingId: ID!
    followerId: ID!
  }
  type Query {
    find: [Follow]
  }
  type Mutation {
    followUser(newFollow: FollowInput): String
  }
`;
export const followResolvers = {
  Query: {
    find: async () => {
      const follows = await FollowModel.find();
      return follows;
    },
  },
  Mutation: {
    followUser: async (_, args) => {
      const response = await FollowModel.followUser(args.newFollow);
      return response;
    },
  },
};
