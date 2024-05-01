import HttpError from "./HttpError.js";
import { checkToken } from "../services/jwtService.js";
import { User } from "../models/userModel.js";

export const tokenCheck = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  try {
    const userId = checkToken(token);
    if (!userId) next(HttpError(401, "Not authorized"));
    const currentUser = await User.findById(userId);
    if (!currentUser) next(HttpError(401, "Not authorized"));
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
