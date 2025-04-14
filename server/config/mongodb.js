import { MongoClient } from "mongodb";

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);
let db = null;
function connect() {
  try {
    db = client.db("DatabaseGC01");
  } catch (error) {
    console.log(error, "error connect to mongodb");
  }
}

export function getDB() {
  if (!db) connect();
  return db;
}
