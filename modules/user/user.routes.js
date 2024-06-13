import express from "express";
import { register, login, logout } from "./user.controllers.js";
import { checkEmailExists } from "./user.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", checkEmailExists, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
