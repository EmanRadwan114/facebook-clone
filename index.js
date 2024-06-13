import express from "express";
import cors from "cors";
import { initModels } from "./models/index.js";
import userRouter from "./modules/user/user.routes.js";
import postRouter from "./modules/post/post.routes.js";
import commentRouter from "./modules/comment/comment.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
