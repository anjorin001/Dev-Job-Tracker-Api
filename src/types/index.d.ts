import { UserPayload } from "../modules/users/user.payload";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}