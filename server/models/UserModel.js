import { getDB } from "../config/mongodb.js";
import { hashPassword } from "../helpers/bcrypt.js";
import validator from "validator";

export default class UserModel {
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
  static getCollection() {
    const db = getDB();
    const collection = db.collection("User");
    return collection;
  }
  static async find() {
    const collection = UserModel.getCollection();
    const users = await collection.find().toArray();
    return users;
  }
}
