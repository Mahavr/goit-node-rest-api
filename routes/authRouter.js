import express from "express";
import {
  login,
  signup,
  logout,
  getCurrent,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";

import { signupUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import { tokenCheck } from "../helpers/tokenCheck.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(signupUserSchema), signup);
userRouter.post("/login", validateBody(loginUserSchema), login);
userRouter.post("/logout", tokenCheck, logout);
userRouter.get("/current", tokenCheck, getCurrent);
export default userRouter;
