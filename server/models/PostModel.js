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

    const collection = PostModel.getCollection();
    await collection.insertOne(payload);
    return "Berhasil menyimpan post";
  }
  static async find() {
    const collection = PostModel.getCollection();
    const posts = await collection.find().toArray();
    return posts;
  }
}
