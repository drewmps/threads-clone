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
    followUser: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();
      let newFollow = args.newFollow;
      newFollow.followerId = user._id.toString();
      const response = await FollowModel.followUser(args.newFollow);
      return response;
    },
  },
};
