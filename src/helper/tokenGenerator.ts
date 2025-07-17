import jwt from "jsonwebtoken";
import { UserPayload } from "../modules/users/user.payload";

const JWT_SECRETE = process.env.JWT_SECRETE;

export const tokenGenerator = async (user) => {
  const payload: UserPayload = { userId: user._id, userEmail: user.email };
  const token = await jwt.sign(payload, JWT_SECRETE, { expiresIn: "12hr" });
  return token;
};
