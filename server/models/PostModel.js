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
    if (!payload.content) {
      throw new Error("Content is required");
    }
    if (!payload.username) {
      throw new Error("Username is required");
    }
    const post = collection.findOne({ _id: new ObjectId(payload.postId) });
    if (!post) {
      throw new Error("Post not found");
    }

    const newComment = {
      content: payload.content,
      username: payload.username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const collection = PostModel.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(payload.postId) },
      { $push: { comments: newComment } }
    );
    return "Berhasil menyimpan comment";
  }
  static async find() {
    const collection = PostModel.getCollection();
    const posts = await collection.find().toArray();
    return posts;
  }
}
