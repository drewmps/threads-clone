import { getDB } from "../config/mongodb.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import validator from "validator";
import { signToken } from "../helpers/jwt.js";
import { ObjectId } from "mongodb";

export default class UserModel {
  static getCollection() {
    const db = getDB();
    const collection = db.collection("users");
    return collection;
  }

  static async register(payload) {
    if (!payload.username) {
      throw new Error("Username is required");
    }
    if (!payload.email) {
      throw new Error("Email is required");
    }
    if (!payload.password) {
      throw new Error("Password is required");
    }
    if (!payload.email) {
      throw new Error("Email is required");
    }
    if (payload.password.length < 5) {
      throw new Error("Minimum password length is 5");
    }
    if (!validator.isEmail(payload.email)) {
      throw new Error("Email format is wrong");
    }

    const collection = UserModel.getCollection();
    let user = await collection.findOne({ email: payload.email });
    if (user) {
      throw new Error("Email must be unique");
    }

    user = await collection.findOne({ username: payload.username });
    if (user) {
      throw new Error("Username must be unique");
    }

    let newUser = payload;
    newUser.password = hashPassword(newUser.password);
    await collection.insertOne(newUser);
    return "Berhasil menyimpan data user";
  }

  static async login(payload) {
    if (!payload.username) {
      throw new Error("Username is required");
    }
    if (!payload.password) {
      throw new Error("Password is required");
    }

    const collection = UserModel.getCollection();
    const user = await collection.findOne({ username: payload.username });
    if (!user) {
      throw new Error("Invalid username/password");
    }

    if (!comparePassword(payload.password, user.password)) {
      throw new Error("Invalid username/password");
    }
    return {
      access_token: signToken({
        id: user._id,
      }),
    };
  }

  static async search(payload) {
    const collection = UserModel.getCollection();
    if (!payload.keyword) return [];
    const users = await collection
      .find({
        $or: [
          { username: { $regex: payload.keyword, $options: "i" } },
          { name: { $regex: payload.keyword, $options: "i" } },
        ],
      })
      .toArray();
    return users;
  }

  static async getUserById({ userId }) {
    const collection = UserModel.getCollection();
    const users = await collection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followerId",
            as: "listFollowing",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "listFollowing.followingId",
            foreignField: "_id",
            as: "following",
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followingId",
            as: "listFollower",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "listFollower.followerId",
            foreignField: "_id",
            as: "follower",
          },
        },
        {
          $project: {
            listFollowing: 0,
            "following._id": 0,
            "following.name": 0,
            "following.email": 0,
            "following.password": 0,
            listFollower: 0,
            "follower._id": 0,
            "follower.name": 0,
            "follower.email": 0,
            "follower.password": 0,
          },
        },
      ])
      .toArray();
    if (!users.length === 0) throw new Error("User not found");
    return users[0];
  }
  static async find() {
    const collection = UserModel.getCollection();
    const users = await collection.find().toArray();
    return users;
  }
  static async findOne(id) {
    const collection = UserModel.getCollection();
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
  }
}
