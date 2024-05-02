import express from "express";
import {
  login,
  signup,
  logout,
  getCurrent,
  updateAvatar
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";

import { signupUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import { tokenCheck } from "../helpers/tokenCheck.js";
import { upload } from "../helpers/upload.js";


const userRouter = express.Router();

userRouter.post("/register", validateBody(signupUserSchema), signup);
userRouter.post("/login", validateBody(loginUserSchema), login);
userRouter.post("/logout", tokenCheck, logout);
userRouter.get("/current", tokenCheck, getCurrent);
userRouter.patch("/avatars", tokenCheck, upload.single("avatar"), updateAvatar);
export default userRouter;
