import PostModel from "../models/PostModel.js";

export const postTypeDefs = `#graphql
  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }
  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type ReturnPostAuthor {
    name: String
  }
  type ReturnPost {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    author: ReturnPostAuthor
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  input PostInput {
    content: String!
    tags: [String]
    imgUrl: String
  }
  input CommentInput {
    postId: ID
    content: String!
    username: String!
  }

  type Query {
    getPosts: [ReturnPost]
    getPostById(postId: ID): ReturnPost
  }
  type Mutation {
    createPost(newPost: PostInput): String
    createComment(newComment: CommentInput): String
    likePost(postId: ID, username: String!): String
  }
`;
export const postResolvers = {
  Query: {
    getPosts: async () => {
      const posts = await PostModel.getPosts();
      return posts;
    },
    getPostById: async (_, args) => {
      const post = await PostModel.getPostById(args);
      return post;
    },
  },
  Mutation: {
    createPost: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();

      let { newPost } = args;
      newPost.authorId = user._id.toString();
      const response = await PostModel.createPost(newPost);
      return response;
    },
    createComment: async (_, args) => {
      const response = await PostModel.createComment(args.newComment);
      return response;
    },
    likePost: async (_, args) => {
      const response = await PostModel.likePost(args);
      return response;
    },
  },
};
