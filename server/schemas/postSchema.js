import redis from "../config/redis.js";
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
    username: String
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
  }

  type Query {
    getPosts: [ReturnPost]
    getPostById(postId: ID): ReturnPost
  }
  type Mutation {
    createPost(newPost: PostInput): String
    createComment(newComment: CommentInput): String
    likePost(postId: ID): String
  }
`;
export const postResolvers = {
  Query: {
    getPosts: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();
      const cachedPosts = await redis.get("posts");
      if (cachedPosts) return JSON.parse(cachedPosts);

      const posts = await PostModel.getPosts();
      await redis.set("posts", JSON.stringify(posts));

      return posts;
    },
    getPostById: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();
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
      await redis.del("posts");
      return response;
    },
    createComment: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();

      let { newComment } = args;
      newComment.username = user.username;
      const response = await PostModel.createComment(newComment);
      await redis.del("posts");
      return response;
    },
    likePost: async (_, args, contextValue) => {
      const { authN } = contextValue;
      const user = await authN();
      const { postId } = args;
      const response = await PostModel.likePost({
        postId,
        username: user.username,
      });
      await redis.del("posts");
      return response;
    },
  },
};
