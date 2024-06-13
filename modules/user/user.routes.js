import express from "express";
import { register, login, logout } from "./user.controllers.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
