import { getDB } from "../config/mongodb.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import validator from "validator";
import { signToken } from "../helpers/jwt.js";

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
  static async find() {
    const collection = UserModel.getCollection();
    const users = await collection.find().toArray();
    return users;
  }
}
