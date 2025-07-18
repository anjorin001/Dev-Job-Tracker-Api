import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { UserPayload } from "../modules/users/user.payload";

const JWT_SECRETE = process.env.JWT_SECRETE;

export const tokenGenerator = async (user) => {
  const payload: UserPayload = { userId: user.id, userEmail: user.email };
  const token = jwt.sign(payload, JWT_SECRETE, { expiresIn: "12hr" });
  return token;
};
