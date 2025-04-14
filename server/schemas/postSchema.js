import PostModel from "../models/PostModel.js";

export const postTypeDefs = `#graphql
  type Comment {
    content: String
    username: String
  }
  type Like {
    username: String
  }
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
  }
  input PostInput {
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
  }

  type Query {
    getPosts: [Post]
  }
  type Mutation {
    createPost(newPost: PostInput): String
  }
`;
export const postResolvers = {
  Query: {
    getPosts: async () => {
      const posts = await PostModel.find();
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, args) => {
      const response = await PostModel.createPost(args.newPost);
      return response;
    },
  },
};
