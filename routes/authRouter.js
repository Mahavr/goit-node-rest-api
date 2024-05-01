import express from "express";
import { login, signup } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";

import { signupUserSchema, loginUserSchema } from "../schemas/userSchemas.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(signupUserSchema), signup);
userRouter.post("/login", validateBody(loginUserSchema), login);
export default userRouter;
