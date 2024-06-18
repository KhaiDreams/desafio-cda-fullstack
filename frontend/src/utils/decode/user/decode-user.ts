import jwt from "jsonwebtoken";
import { UserI } from "../../../entities/user.entites";

export interface LoginApiReq {
  message: string | null;
  token: string | null;
}

export const DecodeUser = (
  token: string,
): UserI | null => {
  try {
    const decoded = jwt.decode(token) as UserI;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
