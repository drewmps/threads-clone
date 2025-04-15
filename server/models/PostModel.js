import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";

export default class PostModel {
  static getCollection() {
    const db = getDB();
    const collection = db.collection("posts");
    return collection;
  }

  static async createPost(payload) {
    if (!payload.content) {
      throw new Error("Content is required");
    }
    if (!payload.authorId) {
      throw new Error("authorId is required");
    }

    let newPost = payload;
    newPost.authorId = new ObjectId(newPost.authorId);
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();

    const collection = PostModel.getCollection();
    await collection.insertOne(newPost);
    return "Berhasil menyimpan post";
  }

  static async createComment(payload) {
    const collection = PostModel.getCollection();
    if (!payload.content) {
      throw new Error("Content is required");
    }
    if (!payload.username) {
      throw new Error("Username is required");
    }
    const post = await collection.findOne({
      _id: new ObjectId(payload.postId),
    });
    if (!post) {
      throw new Error("Post not found");
    }

    const newComment = {
      content: payload.content,
      username: payload.username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(payload.postId) },
      { $push: { comments: newComment } }
    );
    return "Berhasil menyimpan comment";
  }

  static async likePost(payload) {
    const collection = PostModel.getCollection();
    if (!payload.username) {
      throw new Error("Username is required");
    }
    const post = await collection.findOne({
      _id: new ObjectId(payload.postId),
    });
    if (!post) {
      throw new Error("Post not found");
    }

    const newLike = {
      username: payload.username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await collection.updateOne(
      { _id: new ObjectId(payload.postId) },
      { $push: { likes: newLike } }
    );
    return "Berhasil menambah like";
  }
  static async getPosts() {
    const collection = PostModel.getCollection();
    const posts = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          $project: {
            "author._id": 0,
            "author.username": 0,
            "author.email": 0,
            "author.password": 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();
    return posts;
  }
  static async getPostById({ postId }) {
    const collection = PostModel.getCollection();
    const posts = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          $project: {
            "author._id": 0,
            "author.username": 0,
            "author.email": 0,
            "author.password": 0,
          },
        },
        {
          $match: {
            _id: new ObjectId(postId),
          },
        },
      ])
      .toArray();
    if (!posts.length === 0) throw new Error("Post not found");
    return posts[0];
  }
}
