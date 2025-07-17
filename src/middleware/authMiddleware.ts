import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../exception/baseError";
import { ExpressContext } from "../util/ExpressContext";
import { UserPayload } from "../modules/users/user.payload";

const JWT_SECRETE = process.env.JWT_SECRETE;

export const authMiddleware = async ({ req, res, next }: ExpressContext) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
        throw new UnauthorizedError("authorization missing in headers");
    
  try {
    const token = authHeader.split(" ")[1];
    if (!token)
      throw new UnauthorizedError("token is missing in authorization");
      const decode = jwt.verify(token, JWT_SECRETE) as UserPayload;
      req.user = decode;
  } catch (err) {
      next(err)
  }
};
