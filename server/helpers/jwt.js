import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY_JWT;
export function signToken(data) {
  return jwt.sign(data, SECRET_KEY);
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}
