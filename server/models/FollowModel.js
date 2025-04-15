import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";

export default class FollowModel {
  static getCollection(collectionName) {
    const db = getDB();
    const collection = db.collection(collectionName);
    return collection;
  }

  static async followUser(payload) {
    const usersCollection = FollowModel.getCollection("users");
    const followsCollection = FollowModel.getCollection("follows");
    if (!payload.followingId) {
      throw new Error("followingId is required");
    }
    if (!payload.followerId) {
      throw new Error("followerId is required");
    }

    if (payload.followerId === payload.followingId) {
      throw new Error("Cannot follow yourself");
    }

    const following = await usersCollection.findOne({
      _id: new ObjectId(payload.followingId),
    });
    if (!following) {
      return new Error("User does not exist");
    }

    const duplicateFollow = await followsCollection.findOne({
      followerId: new ObjectId(payload.followerId),
      followingId: new ObjectId(payload.followingId),
    });
    if (duplicateFollow) throw new Error("User is already followed");

    let newFollow = payload;
    newFollow.followerId = new ObjectId(newFollow.followerId);
    newFollow.followingId = new ObjectId(newFollow.followingId);
    newFollow.createdAt = new Date();
    newFollow.updatedAt = new Date();

    await followsCollection.insertOne(newFollow);
    return "Berhasil memfollow";
  }

  static async find() {
    const followsCollection = FollowModel.getCollection("follows");
    const follows = await followsCollection.find().toArray();
    return follows;
  }
}
